import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';

const ListItem = ({ productName, productImage, expireDate, productKey }) => {
    return (
        <View>
            <View style={{ marginStart: 10 }}>
                <List.Item
                    key={productKey}
                    title={productName}
                    description={`Data de validade: ${expireDate}`}
                    left={() => <Avatar.Image source={productImage} style={{ backgroundColor: 'transparent' }} size={60} />}
                />
            </View>
            <Divider style={{ height: 1 }} />
        </View>
    );
}

export default ListItem;