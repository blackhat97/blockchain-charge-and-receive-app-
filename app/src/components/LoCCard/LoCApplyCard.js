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
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/css/main.css';

class LoCApplyCard extends Component {
  constructor(props) {
		super(props);
		this.state = {
      redirect: false
		}
    this.handleOnClick = this.handleOnClick.bind(this);
	}

  handleOnClick() {
    this.props.callback({}, true);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.props.user + "/loc/create"} />;
    }
    return (
      <div className="LoCCard noBorder">
        <h2>{this.props.user === 'alice' ? '청구 신청서' : '청구 신청서'}</h2>
        <p>해당고객에게 청구를 신청하여 물품별 대금지급을 실시간 확인 및 업데이트를 진행할 수 있다.</p>
        {this.props.user === 'alice' && 
          <button className="viewButton applyButton" onClick={() => this.handleOnClick()}>청구서 작성하기</button>
        }
      </div>
    );
  }
}


export default LoCApplyCard;
