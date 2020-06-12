import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, KeyboardAvoidingView, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Dialog } from 'react-native-simple-dialogs';
import ToggleSwitch from 'toggle-switch-react-native';
import FeIcon from 'react-native-vector-icons/dist/Feather';

import { DARK3, PRIMARY, PRIMARY_VARIANT, DANGER } from '../../util/colors';
import { addItem, resetError, editItem } from '../../store/actions/index';
import { EYE, EYE_OFF } from '../../util/icons';
import { isEmty } from '../../util/util';
import Text from '../../components/UI/Text/Text';
import TextInput from '../../components/UI/TextInput/TextInput';
import Picker from '../../components/UI/Picker/Picker';

class AddItem extends Component {
  state = {
    id: '',
    password: '',
    hide: false,
    group: 'None',
    newGroup: ''
  }
  componentDidMount() {
    this.onOpen();
  }
  UNSAFE_componentWillReceiveProps() {
    this.onOpen();
  }
  onOpen = () => {
    if(this.props._id) {
      this.setState({ 
        id: this.props.id,
        hide: this.props.hide,
        group: this.props.group,
        error: null
      });
    }
  }
  onReset = () => {
    this.setState({
      id: '',
      password: '',
      hide: false,
      group: 'None',
      newGroup: '',
      error: null,
      showPwd: false
    });
  }
  onChange = (type, val) => {
    this.setState({ [type]: val, error: null });
  }
  onToggle = (type) => {
    this.setState(prevState => {
      return { [type]: !prevState[type], error: null };
    });
  }
  onAddItem = () => {
    this.props.resetError();
    if(isEmty(this.state.id)) {
      this.setState({ error: 'ID cannot be emty!' });
    } else if(isEmty(this.state.password)) {
      this.setState({ error: 'Password cannot be emty!' });
    } else if(this.state.group === 'Add New' && isEmty(this.state.newGroup)) {
      this.setState({ error: 'Tag name cannot be emty!' });
    } else {
      const data = {
        id: this.state.id,
        password: this.state.password,
        hide: this.state.hide,
        group: this.state.group === 'Add New' ? this.state.newGroup : this.state.group
      }
      this.props.addItem(data, () => {
        this.onReset();
        this.props.onPress();
      });
    }
  }
  onEditItem = () => {
    this.props.resetError();
    if(isEmty(this.state.id)) {
      this.setState({ error: 'ID cannot be emty!' });
    } else if(this.state.group === 'Add New' && isEmty(this.state.newGroup)) {
      this.setState({ error: 'Tag name cannot be emty!' });
    } else {
      const data = {
        id: this.state.id,
        hide: this.state.hide,
        group: this.state.group === 'Add New' ? this.state.newGroup : this.state.group,
        _id: this.props._id,
        createdAt: this.props.createdAt
      }
      this.props.editItem(data, () => {
        this.onReset();
        this.props.onPress();
      });
    }
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('Add New');
    let grp = (
      <View style={[style.formItem, { borderColor: PRIMARY_VARIANT, borderWidth: 1, height: 42, borderRadius: 5 }]} >
        <Picker 
          items={groups}
          onChangePickerValue={(val) => this.onChange('group', val)}
          item={this.state.group}
        />
      </View>
    );
    if(this.state.group === 'Add New') {
      grp = (
        <View style={style.formItem} >
          <TextInput
            onChangeText={(val) => this.onChange('newGroup', val)}
            value={this.state.newGroup}
            placeholder='Tag'
          />
        </View>
      );
    }
    let error = null;
    if(this.state.error || this.props.error) {
      error = (
        <Text text={this.state.error ? this.state.error : this.props.error} type='h5' style={{ color: DANGER, marginBottom: 5, fontFamily: 'Roboto-Medium' }} />
      );
    }
    let button = (
      <TouchableNativeFeedback onPress={this.props._id ? this.onEditItem : this.onAddItem} >
        <View style={style.button} >
          <Text text={this.props._id ? 'Save' : 'Add'} type='h4' />
        </View>
      </TouchableNativeFeedback>
    );
    if(this.props.loading) {
      button = (
        <ActivityIndicator size='large' color={PRIMARY} style={{ marginBottom: 10 }} />
      );
    }
    return (
      <Dialog
        visible={this.props.visible}
        onTouchOutside={this.props.onPress}
        dialogStyle={style.dialogStyle}
        contentStyle={[{ margin: 0, padding: 0, paddingVertical: 5 }]}
        animationType='slide'
        hideBottomOverlay
      >
        <KeyboardAvoidingView style={style.container} behavior='height' >
          <Text text={this.props.title} type='h4' style={{ fontFamily: 'Roboto-Medium' }} />
          <View style={style.form} >
            {error}
            <View style={style.formItem} >
              <TextInput
                onChangeText={(val) => this.onChange('id', val)}
                value={this.state.id}
                placeholder='ID'
              />
            </View>
            {this.props._id ? null : (
              <View style={[style.formItem, { flexDirection: 'row' }]} >
                <View style={{ width: '75%' }} >
                  <TextInput
                    onChangeText={(val) => this.onChange('password', val)}
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry={!this.state.showPwd}
                  />
                </View>
                <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }} >
                  <TouchableOpacity onPress={() => this.onToggle('showPwd')} >
                    <FeIcon name={this.state.showPwd ? EYE_OFF : EYE} style={{ color: '#fff', fontSize: 28 }} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {grp}
            <View style={[style.formItem, { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]} >
              <Text text='Hide' type='h4' style={{ marginRight: 10 }} />  
              <ToggleSwitch 
                isOn={this.state.hide}
                size="small"
                onToggle={() => this.onToggle('hide')}
              />
            </View>
            <TouchableOpacity onPress={this.onReset} >
              <Text text='reset' type='h5' style={{ color: PRIMARY_VARIANT, marginVertical: 10 }} />
            </TouchableOpacity>
          </View>
          {button}
        </KeyboardAvoidingView>
      </Dialog>
    );
  }
}

const style = StyleSheet.create({
  dialogStyle: {
    backgroundColor: DARK3,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - (Dimensions.get('screen').height / 3),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  button: {
    backgroundColor: PRIMARY,
    width: 150,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 20
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  formItem: {
    width: '80%',
    height: 35,
    marginVertical: 8
  }
});

const mapStateToProps = state => {
  return {
    groups: state.item.groups,
    loading: state.loading.loading,
    error: state.error.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addItem: (data, done) => dispatch(addItem(data, done)),
    resetError: () => dispatch(resetError()),
    editItem: (data, done) => dispatch(editItem(data, done)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);