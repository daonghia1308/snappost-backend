import Local from './local';
let host = 'http://localhost:1337';

let request = {};
request.post = async (url, data) => {
    url = `${host}${url}`
    let option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Local.get('token') || 'customer'}`,
            'Accept-Language': 'vi'
        }
    };
    console.log('POST', url, option);
    let res = await fetch(url, option);
    let rs = await res.json();
    console.log('RESPOND', rs);
    return rs;
}
export default request;
import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import _ from 'lodash';
import Request from './request';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Alert, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';
const types = ['customer', 'backend']
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], type: '' }
    }
    async componentDidMount() {
        let rs = await Request.post('/api/docgen', {});
        let data = [];
        for (var i in rs.rs) {
            rs.rs[i].url = `/api/${i}`
            data.push(rs.rs[i]);
        }
        this.setState({ data });
    }
    renderInput(input) {
        let data = [];
        for (var i in input) {
            input[i].name = i;
            data.push(input[i]);
        }
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tham số</th>
                        <th>Bắt buộc</th>
                        <th>Kiểu dữ liệu</th>
                        <th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        let css = '';
                        if (item.required) css = 'required text-danger';
                        return (
                            <tr className={css}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.required ? <span>Bắt buộc</span> : <span>Không</span>}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>)
    }

    renderOutput(output) {
        let data = [];
        for (var i in output) {
            output[i].name = i;
            data.push(output[i]);
        }
        return (
            <div>
                {data.map((item, index) => {
                    if (item.name == 'error') return null;
                    let example = {};
                    try {
                        example = JSON.parse(item.outputExample);
                    } catch (err) {
                        console.log('parse error', item.outputExample);
                    }
                    if (!item.response) item.response = [];
                    return (
                        <div className='output-container'>
                            <p className='header'>{item.name}</p>
                            {item.response.length > 0 ? (
                                <React.Fragment>
                                    <p>Trường dữ liệu trả về</p>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Stt</th>
                                                <th>Trường dữ liệu</th>
                                                <th>Kiểu dữ liệu</th>
                                                <th>Mô tả dữ liệu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.response.map((r, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{r.key}</td>
                                                        <td>{r.type}</td>
                                                        <td>{r.description}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </React.Fragment>
                            ) : null}
                            {!_.isEmpty(example) ? (
                                <React.Fragment>
                                    <p>Dữ liệu mẫu</p>
                                    <JSONPretty data={example}></JSONPretty>
                                </React.Fragment>) : null}
                        </div>)
                })}
            </div>
        )
    }
    renderAPI(data) {
        return (
            <div>
                {data.map((api, index) => {
                    return (
                        <Card className='api-container'>
                            <CardBody id={api.friendlyName}>
                                <CardTitle><h4>{api.friendlyName}</h4></CardTitle>
                                <Alert color='success'>{api.url}</Alert>
                                {api.description ? <CardSubtitle>{api.description}</CardSubtitle> : null}
                                {!_.isEmpty(api.inputs) ? (
                                    <React.Fragment>
                                        <h5>Đầu vào</h5>
                                        {this.renderInput(api.inputs)}
                                    </React.Fragment>) : null}
                                {!_.isEmpty(api.exits) ? (
                                    <React.Fragment>
                                        <h5>Đầu ra</h5>
                                        {this.renderOutput(api.exits)}
                                    </React.Fragment>
                                ) : null}
                            </CardBody>
                        </Card>)
                })}
            </div>
        )
    }
    renderExits(exit) {

    }

    renderList(data) {
        return (
            <div>
                <ul className='api-list'>
                    {data.map((api, index) => {
                        return (
                            <li><a href={`#${api.friendlyName}`}>{api.friendlyName}</a></li>)
                    })}
                </ul>
            </div>)
    }
    render() {
        return (
            <Container>
                <div className='row'>
                    <div className='col col-md-4'>
                        <p>Chọn loại API</p>
                        <select
                            className='form-control'
                            value={this.state.type}
                            onChange={evt => { this.setState({ type: evt.target.value }) }}
                        >
                            {types.map((t, index) => <option value={t}>{t}</option>)}
                        </select>            {this.renderList(this.state.data)}
                    </div>
                    <div className='col col-md-8'>
                        {this.renderAPI(this.state.data)}
                    </div>
                </div>
            </Container>);
    }
}
export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<App />, document.getElementById('root'));