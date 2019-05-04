import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Chip from './chip'
import Selectize from './selectize'
import { Icon } from 'react-native-elements'
import Constants from './../../config/constants'

export default class MultipleInput extends Component {
  static defaultProps = {
    onChipClose: () => { },
    onSubmitEditing: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  focus = () => {
    this._childEmailField.focus();
  };

  blur = () => {
    this._childEmailField.blur();
  };

  getSelectedEmails = () => this._childEmailField.getSelectedItems().result;

  isErrored = () => {
    return !!this.state.error;
  };

  validate = email => {
    const { onSubmitEditing } = this.props;

    this.setState({ error: null });
    onSubmitEditing(true);
    return true;
  };

  onSubmitEditing = email => {
    return this.validate(email);
  };

  onChipClose = onClose => {
    const { onChipClose } = this.props;
    const { error } = this.state;

    onChipClose(!error && this.getSelectedEmails().length > 1);
    onClose();
  };

  render() {
    const { items, itemId } = this.props;
    const { error } = this.state;

    return (
      <View>
        <Selectize
          ref={c => (this._childEmailField = c)}
          chipStyle={styles.chip}
          chipIconStyle={styles.chipIcon}
          error={error}
          itemId={itemId}
          items={items}
          label="Tags"
          listStyle={styles.list}
          tintColor="tomato"
          baseColor={Constants.SECONDARY_COLOR}
          textInputProps={{
            onSubmitEditing: this.onSubmitEditing,
            onBlur: () => this._childEmailField.submit(),
            placeholder: 'Insert one or more tags',
            keyboardType: 'email-address'
          }}
          renderRow={(id, onPress, item) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={id}
              onPress={onPress}
              style={styles.listRow}
            >
              <View style={styles.listWrapper}>
                <View style={[styles.listIcon, { backgroundColor: item.iconColor }]}>
                  <Icon
                    name={item.iconName}
                    type={item.iconType}
                    color={Constants.WHITE_COLOR}
                  />
                </View>
                <View>
                  <Text style={styles.listNameText}>{id}</Text>
                  <Text style={styles.listEmailText}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          renderChip={(id, onClose, item, style, iconStyle) => (
            <Chip
              key={id}
              iconStyle={iconStyle}
              onClose={() => this.onChipClose(onClose)}
              text={id}
              style={style}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2
  },
  chipIcon: {
    height: 24,
    width: 24
  },
  list: {
    // height: 180,
    backgroundColor: '#fff',
    position: 'absolute'
  },
  listRow: {
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  listWrapper: {
    flexDirection: 'row',
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    height: 40,
    width: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff'
  },
  listNameText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 21
  },
  listEmailText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 21
  },
  coveredContent: {
    zIndex: -1
  }
});