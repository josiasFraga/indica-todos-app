import React from 'react';
import {
    TouchableNativeFeedback
  } from 'react-native';

import GlobalStyle from '@styles/global';
import {ListItem,Text, Badge} from 'react-native-elements';

type Props = {};

export default class MenuItem extends React.Component<Props> {

    keyExtractor = (item, index) => index.toString()

    render() {
    
        let item = this.props.item;

        return (
            <TouchableNativeFeedback
            onPress={item.onPress}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <ListItem key={this.keyExtractor} bottomDivider onPress={item.onPress}>
                  <ListItem.Content>
                    <ListItem.Title 
                      style={[GlobalStyle.listItemTitle]}>
                        {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                
            </TouchableNativeFeedback>
        );
    }
}
