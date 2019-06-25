import React, { Component, Fragment } from 'react';


class ToDoInp extends Component {
  render() {
    return (
      <Fragment>
        <input type="text" value={this.props.inpValue} onChange={this.props.handleInpValChange} onKeyUp={this.props.handleEnter} />
        <button onClick={this.handleInValue}   >添加</button>
      </Fragment>
    )
  }
}

class ToDoList extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.list !== nextProps.list
  // }
  render() {
    return (
      <ul>
        {this.props.list.map((v, i) => (
          <li key={v.id}>
            <input type="checkbox" checked={v.isChecked} onChange={(e) => { this.props.handleItemCheck(i,e) }} />
            <span  >{v.value}</span>
            ----------------------
          <span onClick={this.props.handleItemDelete} data-id={v.id}>X</span>
          </li>
        ))}
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inpValue: "",
      list: [],
      isAllChecked: false
    }
  }
  setInList() {
    const { list, inpValue } = this.state;
    let newList = list.filter(v => v.value !== inpValue);
    newList.push({ id: Date.now(), value: this.state.inpValue, isChecked: false });
    this.setState({ list: newList, isAllChecked: false });
  }

  handleInValue = () => {
    this.setInList();
  }
  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.setInList();
    }
  }
  handleInpValChange = (e) => {
    this.setState({
      inpValue: e.currentTarget.value
    })
  }
  handleItemDelete = (e) => {
    console.log(123);
    let { id } = e.currentTarget.dataset;
    id = +id;
    let { list } = this.state;
    let index = list.findIndex(v => {
      return v.id === id;
    });
    list.splice(index, 1);
    this.setState({ list }, this.setAllCheck);
  }
  handleItemCheck = (i, e) => {
    let { list } = this.state;
    list[i].isChecked = e.currentTarget.checked;
    console.log(e.currentTarget.checked);
    this.setState({ list }, this.setAllCheck);
  }
  handleAllChecked = (e) => {
    let newList = this.state.list.map(v => {
      v.isChecked = e.currentTarget.checked;
      return v;
    })
    this.setState({ isAllChecked: e.currentTarget.checked, list: newList });
  }
  setAllCheck() {
    let isAllChecked = this.state.list.every(v => v.isChecked);
    this.setState({
      isAllChecked: isAllChecked
    })

  }
  render() {
    return (
      <div>
        <ToDoInp inpValue={this.state.inpValue} handleInpValChange={this.handleInpValChange} handleEnter={this.handleEnter}  ></ToDoInp>
        <ToDoList handleItemDelete={this.handleItemDelete} list={this.state.list} handleItemCheck={this.handleItemCheck} ></ToDoList>
        <div> <input type="checkbox" onChange={this.handleAllChecked} checked={this.state.isAllChecked} /> 全选</div>
      </div>
    );
  }
}

export default App;

