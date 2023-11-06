import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import setAuthorizationHeader from './setAuthorizationHeader';
import { loginSuccess, updateInfo } from './redux/actions/AuthActions';
import jwt from 'jsonwebtoken';

import Nhanxetmonhoc from './pages/nhanxetmonhoc';
import Danhgiahocsinh from './pages/danhgiahocsinh';
import Nhapdiem from './pages/nhapdiemmonhoc';
import Thongkecongviec from './pages/thongkecongviec';
import Tonghopketqua from './pages/baocaotongket';
import Thongkediem from './pages/baocaothongkediem';
import Report from './pages/report';
import ReportNhanxet from './pages/reportnhanxet';
import ReportNhanxettheomon from './pages/reportnhanxettheomon';
import ReportKetquagiaoduc from './pages/reportketquagiaoduc';
import DanhgiahocsinhTT22 from './pages/danhgiahocsinhTT22';
import Capnhathocsinhvang from './pages/capnhathocsinhvang';
import Capnhatketquacuoinam from './pages/capnhatketquacuoinam';
import Admin from './pages/admin';
/* import Reportbangtonghopketqua from './pages/rptbangtonghopketqua'; */

import Header from './components/header'



class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    
    if (cookies.get('awt') != null && cookies.get('awt') !== "undefined") {
      const token = cookies.get('awt'); //'eyJ1aWQiOiJOQTAwMDAwMDIiLCJzaWQiOiI3NEQ4MDdFOTdEQzQ4QkJFIiwiZXhwIjoyMDI1MjAwNzQzfQ.wdUNdlbAS_dWp9mQETO8bTrfzxncaBUE00s6oF6uL7g'//
      setAuthorizationHeader(token);
      this.props.loginSuccess();
      const user = jwt.decode(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token}`);
      this.props.updateInfo(user);
    }
    else {
      window.location = 'http://login.lhbs.vn/?ur=http://psmark.lhbs.vn';
    }
  }

  render() {
    const { isAuth } = this.props;
    return (
      <div className="App">
        <Header authed={isAuth}></Header>
        <Switch>
          <Route exact path="/"  authed={isAuth} />
          <Route exact path="/thongkecongviec" component={Thongkecongviec} authed={isAuth} />
          <Route exact path="/nhanxetmonhoc" component={Nhanxetmonhoc} authed={isAuth} />
          <Route exact path="/danhgiahocsinh" component={DanhgiahocsinhTT22} authed={isAuth} />
          <Route exact path="/nhapdiemmonhoc" component={Nhapdiem} authed={isAuth} />
          <Route exact path="/tonghopketqua" component={Tonghopketqua} authed={isAuth} />
          <Route exact path="/thongkediem" component={Thongkediem} authed={isAuth} />
          <Route exact path="/report" component={Report} authed={isAuth} />
          <Route exact path="/reportcomment" component={ReportNhanxet} authed={isAuth} />
          <Route exact path="/reportcommentbyobject" component={ReportNhanxettheomon} authed={isAuth} />
          <Route exact path="/reporteduresult" component={ReportKetquagiaoduc} authed={isAuth} />
          <Route exact path="/danhgiahocsinhTT22" component={DanhgiahocsinhTT22} authed={isAuth} />
          <Route exact path="/diemdanh" component={Capnhathocsinhvang} authed={isAuth} />
          <Route exact path="/ketquacuoinam" component={Capnhatketquacuoinam} authed={isAuth} />
          <Route exact path="/admin" component={Admin} authed={isAuth} />
          {/* <Route exact path="/rptbangtonghopketqua" component={Reportbangtonghopketqua} authed={isAuth} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default withRouter(withCookies(connect(mapStateToProps, { loginSuccess, updateInfo })(App)));

