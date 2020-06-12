import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import FeIcon from 'react-native-vector-icons/dist/Feather';
import McIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AdIcon from 'react-native-vector-icons/dist/AntDesign';
import FaIcon from 'react-native-vector-icons/dist/FontAwesome5';

import { DARK3, PRIMARY, PRIMARY_VARIANT } from '../../util/colors';
import { EYE, EYE_OFF, SORT_ASC, SORT_DESC, ADD, BOX } from '../../util/icons';
import { setItems, removeItem, changeProp, setHide } from '../../store/actions/index';
import filter from '../../util/filter';
import Picker from '../../components/UI/Picker/Picker';
import TextInput from '../../components/UI/TextInput/TextInput';
import Text from '../../components/UI/Text/Text';
import AddItem from '../../components/AddItem/AddItem';
import Item from '../../components/Item/Item';
import PwdChecker from '../../components/PwdChecker/PwdChecker';

class Home extends Component {
  state = {
    refreshing: true,
    currGroup: 'All',
    search: '',
    order: false,
    addItemModal: false,
    pwdCheckModal: false
  }
  componentDidMount() {
    AsyncStorage.getItem('items')
      .then(items => {
        this.setState({ refreshing: false });
        items = JSON.parse(items);
        if(!items) items = [];
        this.props.setItems(items);
      })
  }
  onPressHide = () => {
    if(this.props.hide) {
      this.setState({ pwdCheckModal: true });
    } else {
      this.props.setHide();
    }
  }
  onToggle = (type) => {
    this.setState(prevState => {
      return { [type]: !prevState[type] };
    });
  }
  onChange = (type, val) => {
    this.setState({ [type]: val });
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('All');
    let ren = null;
    if(filter(this.props.items, this.state.currGroup, this.state.search, this.state.order, this.props.hide).length === 0) {
      ren = (
        <View style={{ marginTop: Dimensions.get('screen').height / 4 }} >
          <FaIcon name={BOX} color={'#000'} size={50} />
          <Text text='Empty!' type='h4' style={{ fontFamily: 'Roboto-Medium', color: '#000' }} />
        </View>
      );
    } else {
      ren = (
        <SafeAreaView style={{ marginBottom: 70 }} >
          <FlatList 
            data={filter(this.props.items, this.state.currGroup, this.state.search, this.state.order, this.props.hide)}
            renderItem={(item) => <Item {...item}
                                        onChangeProp={this.props.changeProp}
                                        onRemoveItem={this.props.removeItem}
                                   />}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
      );
    }
    if(this.state.refreshing) {
      ren = (
        <ActivityIndicator
          style={{ marginTop: Dimensions.get('screen').height / 4 }}
          size='large'
          color={PRIMARY}
        />
      );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center' }} >
        <AddItem
          onPress={() => this.onToggle('addItemModal')}
          visible={this.state.addItemModal}
          title='Add Password'
        />
        <PwdChecker 
          onDialogPress={() => this.onToggle('pwdCheckModal')}
          visible={this.state.pwdCheckModal}
          onSuccess={this.props.setHide}
        />
        <View style={style.filterHeader} >
          <Text text='BlckBox' type='h3' style={{ marginLeft: 10, width: '60%', textAlign: 'left', fontFamily: 'Roboto-Medium' }} />
          <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center' }} >
            <TouchableOpacity onPress={this.onPressHide} >
              <FeIcon name={this.props.hide ? EYE : EYE_OFF} style={style.filterIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onToggle('order')} >
              <McIcon name={this.state.order ? SORT_ASC : SORT_DESC} style={style.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '80%' }} >
          <View style={[style.filterItem, { borderColor: PRIMARY_VARIANT, borderWidth: 1, borderRadius: 5 }]} >
            <Picker 
              items={groups}
              onChangePickerValue={(val) => this.onChange('currGroup', val)}
              item={this.state.currGroup}
            />
          </View>
          <View style={style.filterItem} >
            <TextInput
              onChangeText={(val) => this.onChange('search', val)}
              value={this.state.search}
              placeholder='Search ...'
            />
          </View>
        </View>
        {ren}
        <TouchableOpacity onPress={() => this.onToggle('addItemModal')} style={style.addItemButton} >
          <View style={style.addItemButton} >
            <AdIcon name={ADD} style={{ fontSize: 30, color: '#fff', marginRight: 10 }} />
            <Text text='Add' type='h4' />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  filterItem: {
    width: '100%',
    height: 40,
    marginVertical: 5
  },
  filterHeader: {
    backgroundColor: DARK3,
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5
  },
  filterIcon: {
    color: '#fff',
    fontSize: 30,
    marginHorizontal: 10
  },
  addItemButton: {
    width: '100%',
    height: 45,
    backgroundColor: DARK3,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    groups: state.item.groups,
    items: state.item.items,
    hide: state.item.hide
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setItems: (items) => dispatch(setItems(items)),
    removeItem: (_id) => dispatch(removeItem(_id)),
    changeProp: (_id, type, value) => dispatch(changeProp(_id, type, value)),
    setHide: () => dispatch(setHide())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);