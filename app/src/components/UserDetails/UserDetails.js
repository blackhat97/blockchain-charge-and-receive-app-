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

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.companyName,
      userName: this.props.userName,
      bankName: this.props.bankName,
      accountName: this.props.accountName,
      accountNumber: this.props.accountNumber
    }
  }

  render() {
    return (
      <div className="UserDetails">
        <h2>회사 상세 정보</h2>
        <div>회사 이름: <b>{this.state.companyName}</b></div>
        <div>청구인 이름: <b>{this.state.userName}</b></div>
        <div>은행명: <b>{this.state.bankName}</b></div>
        <div>예금주: <b>{this.state.accountName}</b></div>
        <div>계좌번호: <b>{this.state.accountNumber}</b></div>
      </div>
    );
  }
}

export default UserDetails;
