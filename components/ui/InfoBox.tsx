import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = (info: InfoBoxProps) => {
    const { title, subtitle, containerStyles, titleStyles } = info;
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-agdbold ${titleStyles}`}>{title}</Text>
      <Text className='text-sm text-gray-100 text-center font-agdregular'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox