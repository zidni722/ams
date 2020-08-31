import React, {Component} from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import {Button, Card, CardTitle, FormGroup, Label, Row} from "reactstrap";
import {connect} from "react-redux";

import {NotificationManager} from "../../components/common/react-notifications";
import {Field, Form, Formik} from "formik";

import {loginUser} from "../../redux/actions";
import {Colxx} from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import {apiClient} from "../../helpers/ApiService";
import {Spinner} from "reactstrap"


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    const iconCardsData = [
      {
        title: 'Menunggu',
        icon1: "simple-icon-clock",
        valueMenunggu: 0
      },
      {
        title: 'Tolak',
        icon2: "simple-icon-close",
        valueTolak: 0
      },
      {
        title: 'Selesai',
        icon3: "simple-icon-check",
        valueSelesai: 0
      },
    ]

    reactLocalStorage.setObject('iconCardsData', iconCardsData)
  }

  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        const url = '/auth/login';

        let paramsLogin = {
          email: values.email,
          password: values.password
        };

        apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        apiClient.post(url, paramsLogin).then((result) => {
          const module = 'borrows'

          if (result.status === 200) {
            reactLocalStorage.setObject('me', result.data.data);
            reactLocalStorage.set('token', result.data.data.token);
            reactLocalStorage.set('module', module);  
            
            window.onbeforeunload = () => {
              reactLocalStorage.set('token', result.data.data.token);
            }
          }
        })
        .then(() => {
          apiClient.get(`${module}/count-all-status`)
              .then(res => {
                const responseData = res.data.data
                const iconCardsData = [
                  {
                    title: 'Menunggu',
                    icon1: "simple-icon-clock",
                    valueMenunggu: responseData ? responseData.count_pending_status : 0
                  },
                  {
                    title: 'Tolak',
                    icon2: "simple-icon-close",
                    valueTolak: responseData ? responseData.count_reject_status : 0
                  },
                  {
                    title: 'Selesai',
                    icon3: "simple-icon-check",
                    valueSelesai: responseData ? responseData.count_success_status : 0
                  },
                ]

                reactLocalStorage.setObject('iconCardsData', iconCardsData)
                window.location.href = "/"
              }).catch((e) => {
            console.log(e.message)
          });
        })
        .catch(e => {
          console.log(e.message)
        })
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="8" className="mx-auto my-auto">
          <Card className="auth-card pl-5">
            <div className="position-relative image-side-p ">
            </div>
            <div className="form-side">
              <span className="logo-single mb-3" />
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
                <p className="pt-2 black text-muted mb-3">
                Please login to your account for start the service.
              </p>
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center"><p/>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                      >
                        <Spinner color="primary" />
                        <span className="label"><IntlMessages id="user.login-button" /></span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
