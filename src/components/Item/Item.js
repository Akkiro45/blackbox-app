import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import FeIcon from 'react-native-vector-icons/dist/Feather';

import { PRIMARY, DARK3 } from '../../util/colors';
import { MORE_VERTICAL } from '../../util/icons';
import Text from '../UI/Text/Text';
import Menu from '../Menu/Menu';
import AddItem from '../AddItem/AddItem';
import PwdChecker from '../PwdChecker/PwdChecker';
import ShowPwd from '../ShowPwd/ShowPwd';

class Item extends Component {
  state = {
    showMenu: false,
    addItemModal: false,
    pwdCheckModal: false,
    showPwd: false
  }
  onToggle = (type) => {
    this.setState(prevState => {
      return { [type]: !prevState[type] }
    });
  }
  render() {
    return (
      <View style={style.item} >
        <Menu
          onDialogPress={() => this.onToggle('showMenu')}
          visible={this.state.showMenu}
          item={this.props.item}
          onEditItem={() => this.onToggle('addItemModal')}
          onRmoveItem={() => this.props.onRemoveItem(this.props.item._id)}
          onChangeProp={() => this.props.onChangeProp(this.props.item._id, 'hide', !this.props.item.hide)}
        />
        <PwdChecker 
          onDialogPress={() => this.onToggle('pwdCheckModal')}
          visible={this.state.pwdCheckModal}
          onSuccess={() => this.onToggle('showPwd')}
        />
        <ShowPwd 
          onDialogPress={() => this.onToggle('showPwd')}
          visible={this.state.showPwd}
          password={this.props.item.password}
          id={this.props.item.id}
        />
        <AddItem
          onPress={() => this.onToggle('addItemModal')}
          visible={this.state.addItemModal}
          title='Edit'
          {...this.props.item}
        />
        <View style={style.idContainer} >
          <Text text={this.props.item.id} type='h5' numberOfLines={1} style={{ textAlign: 'left', maxWidth: '85%' }} />
          <TouchableOpacity onPress={() => this.onToggle('showMenu')} >
            <FeIcon name={MORE_VERTICAL} style={{ color: '#fff', fontSize: 20, alignSelf: 'flex-end' }} />
          </TouchableOpacity>
        </View>
        <View style={style.pwdContainer} >
          <Text text='********' numberOfLines={1} type='h1' style={style.pwdText} />
          <TouchableNativeFeedback onPress={() => this.onToggle('pwdCheckModal')} >
            <View style={style.showBtn} >
              <Text text='show' style={{ fontFamily: 'Roboto-Medium' }} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    width: '90%',
    height: 120,
    borderRadius: 10,
    elevation: 10,
    marginVertical: 5,
    backgroundColor: DARK3,
    padding: '4%',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  idContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pwdContainer: {
    width: '100%',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  showBtn: {
    backgroundColor: PRIMARY,
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  pwdText: {
    textAlign: 'left',
    maxWidth: '70%',
    // borderBottomColor: PRIMARY,
    // borderBottomWidth: 1,
    // fontFamily: 'Roboto-Medium'
  }
});

export default Item;