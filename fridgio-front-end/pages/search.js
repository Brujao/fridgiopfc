import React, { Component } from 'react';
import {
  View
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';



export default class Buscar extends Component {
  constructor(){
    super()
    this.state = {
      selectedItems: [],
      items: [],
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  componentWillMount(){

      fetch("https://cursed.studio/api/ingredientes", {
         method: "GET",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         }
      })
      .then((response)=> response.json())
      .then((res) =>{
        this.setState({items: res});
        console.log(res);
      });
    }


  render() {
    return (
      <View>

        <SectionedMultiSelect
          items={this.state.items}
          uniqueKey='id'
          subKey='children'
          selectText='Escolha os ingredientes'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />

      </View>
    );
  }


}
