import React, { Component } from "react"
import { Button, FormGroup, Card, Row, CardBody } from "reactstrap"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Colxx } from "../../components/common/CustomBootstrap"
import { apiClient } from "../../helpers/ApiService"
import { reactLocalStorage } from "reactjs-localstorage"
import { NotificationManager } from "../../components/common/react-notifications"
import { me } from "../../constants/defaultValues"


const formSchema = Yup.object().shape({
    oldpass: Yup.string().required("Required"),
    newpass: Yup.string().required("Required"),
    confirmpass: Yup.string()
        .oneOf([Yup.ref("newpass"), null], "Passwords must match")
        .required("Required")
})

class FormikGantiPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass: "",
            newpass: "",
            confirmpass: "",
            role_id: "",
            city_id: "",
            division_id: "",
            isLoading: false
        };
    }
    componentDidMount() {
        apiClient.get('/users/' + me.id)
            .then((res) => {
                this.setState({ detailUser: res.data.data })
                // reactLocalStorage.set('defaultRoleValue', this.state.detailUser.role_id);
                // reactLocalStorage.set('defaultRoleLabel', this.state.detailUser.role_name);
                // reactLocalStorage.set('defaultDivisionValue', this.state.detailUser.division_id);
                // reactLocalStorage.set('defaultDivisionLabel', this.state.detailUser.division_name);
                // reactLocalStorage.set('defaultCityValue', this.state.detailUser.city_id);
                // reactLocalStorage.set('defaultCityLabel', this.state.detailUser.city_name);

                this.setState({ role_id: this.state.detailUser.role_id })
                this.setState({ division_id: this.state.detailUser.division_id })
                this.setState({ city_id: this.state.detailUser.city_id })
                this.setState({ isLoading: true })

            }).catch((e) => {
                console.log(e.message)
                setTimeout(() => { this.setState({ isLoading: true }) }, 500)

            })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handlerSubmit = async (event, values) => {
        event.preventDefault();

        apiClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';

        const formData = new FormData();

        formData.append('old_password', this.state.oldpass)
        formData.append('password', this.state.password)
        formData.append('city_id', this.state.city_id)
        formData.append('role_id', this.state.role_id)
        formData.append('division_id', this.state.division_id)

        console.log(this.state);

        apiClient.put('/users/' + this.state.detailUser.id, formData)
            .then(res => {
                if (res.status === 200) {
                    apiClient.get('/users/' + this.state.detailUser.id)
                        .then(res => {
                            if (res.status === 200) {
                                if (me.id === this.state.detailUser.id) {
                                    const newMe = res.data.data
                                    newMe.token = me.token

                                    reactLocalStorage.remove('me')
                                    reactLocalStorage.setObject('me', newMe)
                                    reactLocalStorage.set('_pswrd', this.state.password)
                                }
                                reactLocalStorage.set('isSuccesSubmit', true)
                                window.location.href = "./profil"
                            }
                        }).catch((e) => {
                            NotificationManager.error(
                                `${e.response.data.data}`,
                                "Terjadi Kesalahan",
                                5000,
                                () => {
                                    this.setState({ visible: false });
                                },
                                null
                            );
                        });
                }
            }).catch((e) => {
                NotificationManager.error(
                    `${e.response.data.message}`,
                    "Terjadi Kesalahan",
                    5000,
                    () => {
                        this.setState({ visible: false });
                    },
                    null
                );
            });
    };

    render() {
        return (
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <Formik
                                initialValues={{
                                    oldpass: "",
                                    newpass: "",
                                    confirmpass: ""
                                }}
                                validationSchema={formSchema}
                            >
                                {({ errors, touched }) => (
                                    <Form onSubmit={this.handlerSubmit}>
                                        <FormGroup>
                                            <input
                                                name="oldpass"
                                                id="oldpass"
                                                type="password"
                                                onChange={this.handleChange}

                                                className={`form-control ${errors.oldpass &&
                                                    touched.oldpass &&
                                                    "is-invalid"}`}
                                                placeholder="Old Password"
                                            />
                                            {errors.oldpass && touched.oldpass ? (
                                                <div className="text-danger">{errors.oldpass}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <input
                                                id="password"
                                                name="password"
                                                placeholder="New Password"
                                                type="password"
                                                onChange={this.handleChange}

                                                className={`form-control ${errors.newpass &&
                                                    touched.newpass &&
                                                    "is-invalid"}`}
                                            />
                                            {errors.newpass && touched.newpass ? (
                                                <div className="text-danger">{errors.newpass}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <input
                                                name="confirmpass"
                                                id="confirmpass"
                                                type="password"
                                                onChange={this.handleChange}

                                                className={`form-control ${errors.confirmpass &&
                                                    touched.confirmpass &&
                                                    "is-invalid"}`}
                                                placeholder="Confirm Password"
                                            />
                                            {errors.confirmpass && touched.confirmpass ? (
                                                <div className="text-danger">{errors.confirmpass}</div>
                                            ) : null}
                                        </FormGroup>
                                        <div className="d-flex justify-content-between float-right align-items-center">
                                            <Button
                                                className="mb-1"
                                                color="primary"
                                                type="reset"
                                                outline
                                            >
                                                Batal
                                                </Button>
                                            <Button
                                                className=" mr-1 mb-1"
                                                color="primary"
                                                type="submit"
                                            >
                                                Simpan Perubahan
                                                </Button>

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        )
    }
}
export default FormikGantiPassword;