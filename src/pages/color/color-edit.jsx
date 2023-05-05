

import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useData from '../../hooks/useData';

const ColorUpdate = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { updateHandler, getDetails } = useData("/colors")
    const data = getDetails(`/colors/${params.id}`)

    const initialValues = {
        name: data ? data.name : '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values, action) => {
            console.log(values);
            updateHandler(values, params.id)
            navigate('/color/list')
        },
    });



    return (
        <Box>
            <Box textAlign="center" mb={2}>
                <Typography fontSize={25} component="h3" color="primary">Update Color</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <Box textAlign="end" mt={3}>
                    <Button variant="contained" type="submit">{formik.isSubmitting ? "Loading" : "Update"}</Button>
                </Box>
            </form>
        </Box>
    );
};

export default ColorUpdate;