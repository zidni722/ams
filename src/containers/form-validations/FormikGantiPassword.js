import React, { Component } from "react"
import { Button, FormGroup, Card, Row, CardBody } from "reactstrap"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Colxx } from "../../components/common/CustomBootstrap"


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
            newpass:"",
            confirmpass:"",
            isLoading: false
        };
    }
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
                                    <Form>
                                        <FormGroup>
                                            <input
                                                name="oldpass"
                                                id="oldpass"
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
                                                name="newpass"
                                                placeholder="New Password"
                                                id="newpass"
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
                                                className={`form-control ${errors.confirmpass &&
                                                    touched.confirmpass &&
                                                    "is-invalid"}`}
                                                placeholder="Confirm Password"
                                            />
                                            {errors.confirmpass && touched.confirmpass ? (
                                                <div className="text-danger">{errors.confirmpass}</div>
                                            ) : null}
                                        </FormGroup>
                                        <div className="d-flex justify-content-start flex-wrap">
                                            <Button.Ripple
                                                className="mr-1 mb-1"
                                                color="primary"
                                                type="submit"
                                            >
                                                Save Changes
                                                </Button.Ripple>
                                            <Button.Ripple
                                                className="mb-1"
                                                color="danger"
                                                type="reset"
                                                outline
                                            >
                                                Cancel
                                                </Button.Ripple>
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