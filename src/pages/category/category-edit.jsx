import React from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from "@mui/material"
import { Formik, Form } from 'formik'
import useData from '../../hooks/useData'
import { useNavigate } from 'react-router-dom'




const CategoryEdit = () => {

    const params = useParams()

    const { updateData, getDetail } = useData(`/categories`)
    const data = getDetail(`/categories/${params.id}`)

    const initValues = {
        name: data ? data.name : "",
        image: ""
    }

    const navigate = useNavigate()

    const handleSubmit = async (values, actions) => {
        console.log('values=', values)
        var formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await updateData(formData, `/categories/${params.id}`, headers)
        if (response) {
            actions.resetForm()
            navigate('/category/list')
        }
    }

    return (
        <div>hello route {params.id}
            <Box>
                <Box textAlign="center" mb={2}>
                    <Typography fontSize={25} component="h3" color="primary">Category Add</Typography>
                </Box>

                <Formik
                    enableReinitialize={true}
                    initialValues={initValues}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Form>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                label="Category Name"
                                variant="outlined"
                                sx={{ my: 1 }}
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                type='file'
                                fullWidth
                                size="small"
                                id="outlined-basic"
                                name='image'
                                onChange={e =>
                                    formik.setFieldValue('image', e.currentTarget.files[0])
                                }
                                variant="outlined"
                                sx={{ my: 1 }}
                                accept='image/*'
                            />
                            <img src={data?.image} height={100} alt='Cat Image' />


                            <Box textAlign="end" mt={3}>
                                <Button variant="contained" type='submit'>{formik.isSubmitting ? 'Loading...' : 'Update'}</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box >
        </div>
    )

}
export default CategoryEdit;