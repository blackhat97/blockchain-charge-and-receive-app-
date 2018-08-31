/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { Component } from 'react';
import '../../stylesheets/css/main.css';
import { connect } from "react-redux";
import { getProductDeatils } from "../../actions/actions";
import { getRules } from "../../actions/actions";
const _ = require('lodash');

class DetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      editable: false
    }
  }

  switchEditable() {
    const currentState = this.state.editable;
    this.setState({
      editable: !currentState
    });
  }

  handleChange(index, event) {
    const data = this.state.data;
    switch (this.props.type) {
    case 'Rules':
      data[index] = {ruleText: event.target.value};
      break;
    case 'Product':
      if (this.props.data == null || !Array.isArray(this.props.data.items)) {
        this.props.data.items = [];
      }
      console.log(Array.isArray(this.props.data.items));
      if (this.props.data && Array.isArray(this.props.data.items)) {
        if (this.props.isCreate && index == 'quantity') {
          _.set(this.props, 'data.items.0.'+index, event.target.value);
          _.set(this.props, 'data.items.0.remain', event.target.value);
        } else {
          _.set(this.props, 'data.items.0.'+index, event.target.value);
        }
        // console.log(this.props.data.items[0][index]);
        // this.props.data.items[0][index] = event.target.value;
      }
      break;
    default:
      break;
    }

    this.setState({
      data: data
    });
  }

  getProp (type) {
    switch (type) {
    case 'name':
      return  _.get(this.props.data, 'items.0.name') || "물품 이름을 작성하세요.";
      break;
    case 'price':
      return  _.get(this.props.data, 'items.0.price') || 0;
      break;
    case 'quantity':
      return  _.get(this.props.data, 'items.0.quantity') || 0;
      break;
    case 'remain':
      return _.get(this.props.data, 'items.0.remain') || 0;
      break;
    }
  }

  render() {
    let mainHeadingTxt = this.props.title;
    let jsx;

    let containerClasses = this.props.disabled ? "cardContainer disabled" : "cardContainer";
    
    switch(this.props.type) {
    case 'Person':
        jsx = (
          <div>
            <span class="subheadingSpan, topHeading">회사명</span>
            <span class="subheadingSpan">{this.state.data['companyName']}</span>
            <span class="subheadingSpan, topHeading">직원명</span>
            <span class="subheadingSpan">{this.state.data['userName']}</span>
            <span class="subheadingSpan, topHeading">은행명</span>
            <span class="subheadingSpan">{this.state.data['bankName']}</span>
            <span class="subheadingSpan, topHeading">예금주</span>
            <span class="subheadingSpan">{this.state.data['accountName']}</span>
            <span class="subheadingSpan, topHeading">계좌번호</span>
            <span class="subheadingSpan">{this.state.data['accountNumber']}</span>
          </div>
        );
        break;
    case 'Product':
      let currency, amount, remainAmount;
      currency = '₩';
      if ((this.props.user == 'alice' && this.props.data && _.get(this.props, 'data.billId')) || this.props.isCreate) {
        amount = this.getProp('price') * this.getProp('quantity');
        remainAmount = this.getProp('price') * this.getProp('remain');
        if (this.props.isCreate) {
          jsx = (
              <div>
              <span class="subheadingSpan, topHeading">물품</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="text" onChange={this.handleChange.bind(this, 'name')} defaultValue={this.getProp('name')} /> : <span class="subheadingSpan">{this.getProp('name')}</span> }
              <span class="subheadingSpan, topHeading">수량</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="number" min="0" onChange={this.handleChange.bind(this, 'quantity')} defaultValue={this.getProp('quantity')} /> : <span class="subheadingSpan">{this.getProp('quantity') ? this.getProp('quantity') : "0"}</span> }
              <span class="subheadingSpan, topHeading">가격(개당)</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="number" min="0" onChange={this.handleChange.bind(this, 'price')} defaultValue={this.getProp('price')} /> : <span class="subheadingSpan">{currency + (this.getProp('price') ? this.getProp('price') : "0")}</span> }
              <span class="subheadingSpan, topHeading">잔액/총액</span>
              <span class="subheadingSpan">{currency + (remainAmount).toLocaleString()}/{currency + (amount).toLocaleString()}</span>
              </div>
          )
        } else {
          jsx = (
              <div>
              <span class="subheadingSpan, topHeading">물품</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="text" onChange={this.handleChange.bind(this, 'name')} defaultValue={this.getProp('name')} /> : <span class="subheadingSpan">{this.getProp('name')}</span> }
              <span class="subheadingSpan, topHeading">미지급 수량</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="number" min="0" onChange={this.handleChange.bind(this, 'remain')} defaultValue={this.getProp('remain')} /> : <span class="subheadingSpan">{this.getProp('remain') ? this.getProp('remain') : "0"}</span> }
              <span class="subheadingSpan, topHeading">가격(개당)</span>
              { (this.state.editable) ? <input class="subheadingSpan" type="number" min="0" onChange={this.handleChange.bind(this, 'price')} defaultValue={this.getProp('price')} /> : <span class="subheadingSpan">{currency + (this.getProp('price') ? this.getProp('price') : "0")}</span> }
              <span class="subheadingSpan, topHeading">잔액/총액</span>
              <span class="subheadingSpan">{currency + (remainAmount).toLocaleString()}/{currency + (amount).toLocaleString()}</span>
              </div>
          )
        }
      } else if (this.props.user == 'bob' && this.props.data && this.props.data.billId) {
        amount = this.getProp('price') * this.getProp('quantity');
        remainAmount = this.getProp('price') * this.getProp('remain');
        jsx = (
            <div>
            <span class="subheadingSpan, topHeading">물품</span>
            { <span class="subheadingSpan">{this.getProp('name')}</span> }
            <span class="subheadingSpan, topHeading">미지급 수량</span>
            { (this.state.editable) ? <input class="subheadingSpan" type="number" min="0" onChange={this.handleChange.bind(this, 'items.0.remain')} defaultValue={this.getProp('remain')} /> : <span class="subheadingSpan">{this.getProp('remain') ? this.getProp('remain') : "0"}</span> }
            <span class="subheadingSpan, topHeading">가격(개당)</span>
            { <span class="subheadingSpan">{currency + (this.getProp('price') ? this.getProp('price') : "0")}</span> }
            <span class="subheadingSpan, topHeading">잔액/총액</span>
            <span class="subheadingSpan">{currency + (remainAmount).toLocaleString()}/{currency + (amount).toLocaleString()}</span>
          </div>
        );
      }
        break;
      case 'Rules':
        mainHeadingTxt = "거래명세서 이용약관";
        if(this.state.editable) {
          jsx = (
            <ul>
              {this.state.data.map(function(rule, i) {
                return <li><input type="text" onChange={this.handleChange.bind(this, i)} defaultValue={this.state.data[i].ruleText} /></li>;
              }, this)}
            </ul>
          );
        }
        else {
          jsx = (
            <ul>
              {this.state.data.map(function(rule) {
                return <li>{rule.ruleText}</li>;
              })}
            </ul>
          );
        }
        break;
    }

    let buttonTxt = this.state.editable ? "저장" : "수정";
    let editButtonStyle = this.state.editable ? { float: 'right' } : {};
    let styles = this.props.type === 'Rules' ? "outerDiv rules" : "outerDiv"; 
    
    return (
      <div className={styles}>
        <div class={containerClasses}>
          <h5>{mainHeadingTxt}</h5>
          {jsx}
        </div>
        { this.props.canEdit && <button className="editButton" onClick={this.switchEditable.bind((this))}><span style={editButtonStyle}>{buttonTxt}</span></button> }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductDeatils: productDetails => dispatch(getProductDeatils(productDetails)),
    getRules: rules => dispatch(getRules(rules))
  };
};

export default connect(null, mapDispatchToProps)(DetailsCard);
