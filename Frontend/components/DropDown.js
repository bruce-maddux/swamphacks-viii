import RNPickerSelect from 'react-native-picker-select';
import React from "react"
export default function Dropdown(){
    return (
        <RNPickerSelect
        placeholder={{
            label: 'Select a store...',
            value: null,
        }}     
        placeholderTextColor="gray"   
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Walmart', value: 'walmart' },
                { label: 'Publix', value: 'Publix' },
                { label: 'Aldi', value: 'aldi' },
                { label: 'Winn Dixie', value: 'winn dixie' },
                { label: 'Sam\'s Club', value: 'sams club' },
                { label: 'Costco', value: 'costco' },
                { label: 'Whole Foods', value: 'whole foods' },
                { label: 'Fresh Market', value: 'fresh market' },
                { label: 'Target', value: 'target' },


            ]}
        />
    );
};