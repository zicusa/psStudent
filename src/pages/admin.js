import React from 'react';
import './stylemessage.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import api from '../tApi';
import { Button } from 'mdbreact';
import { connect } from 'react-redux';
import { userInfo, updateInfo } from '../redux/actions/AuthActions';
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;

var diem = [];
var headers = [], columns = [];
class admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kydanhgia: 1,
            loading: true,
            listKydanhgia: [{ id: 1, kydanhgia: 'Giữa kỳ 1' }, { id: 2, kydanhgia: 'Cuối kỳ 1' }, { id: 3, kydanhgia: 'Giữa kỳ 2' }, { id: 4, kydanhgia: 'Cuối kỳ 2' }],
            chkValue: false,
            chkText: "Khóa nhập điểm/đánh giá"
        }
    }

    componentDidMount() {
        api.getConfigInfo().then(res => {
            this.setState({ kydanhgia: res[0].KyDanhGia, chkValue: res[0].Enable, loading: false });
        }).then(() => {
            if (this.state.chkValue===true) {
                this.setState({chkText:"Khóa nhập điểm/đánh giá"})
            }
            console.log(this.state.chkValue);
        });
    }

    setThangID = (kydanhgia) => {
        this.setState({ kydanhgia: kydanhgia });
    }
    checkKhoaChucNang =(checked) =>{
        this.setState({chkValue: checked});
        if (checked===true) {
            this.setState({chkText:"Khóa nhập điểm/đánh giá"});
        }
        else{
            this.setState({chkText:"Mở nhập điểm/đánh giá"});
        }
    }

    saveCauhinh = () =>{
        api.updateConfigInfo({kydanhgia: this.state.kydanhgia, enable: this.state.chkValue});        
    }
    render() {
        const { listKydanhgia } = this.state;

        return (
            <div className="container">
                <div className='sweet-loading'>
                    <ScaleLoader
                        className={override}
                        sizeUnit={"px"}
                        size={150}
                        color={'#006b4b'}
                        loading={this.state.loading}
                        margin="4px"
                    />
                </div>
                {/* <button className="btn btn-md" onClick={() => this.saveDanhGia()}><i className="far fa-lg fa-file-excel mr-2" aria-hidden="true"></i>handsome</button> */}
                <div><h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid green', padding: '0.5em' }}>Quản trị hệ thống</h3></div>
                <div className="row justify-content-md-center">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> Chọn Kỳ đánh giá </span>
                            </div>
                            <select id="selectThang" name="" className="form-control  col-md-12" value={this.state.kydanhgia} onChange={(e) => {
                                this.setThangID(e.target.value);
                            }}>
                                {
                                    listKydanhgia.map((row, index) => (
                                        <option value={row.id} key={`k_${index}`}>{row.kydanhgia}</option>
                                    ))
                                }

                            </select>
                        </div>

                    </div>
                   
                    <div className="form-group ml-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" checked ={this.state.chkValue} onChange={(e) => {this.checkKhoaChucNang(e.target.checked)}} />
                                </div>
                            </div>
                            <input type="text" className="form-control cssreadonly" placeholder={this.state.chkText} readOnly/>
                        </div>
                    </div>

                </div>
                <div className="justify-content-md-center">
                    <Button onClick={this.saveCauhinh}>Lưu cấu hình hệ thống</Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.info
})


export default connect(mapStateToProps, { userInfo, updateInfo })(admin);
