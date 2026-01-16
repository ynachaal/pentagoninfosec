import React, { createContext } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { generateCertificate } from '../repository/DashboardAPI';
import { toast } from 'react-toastify';
import { getExpiredCertificates, getIssueCertificates, getUserDetails, updateUserDetails, changePassword } from '../repository/DashboardAPI';
import { showLoading } from 'react-global-loading';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const form = useForm({});
    const { reset } = form;
    const [file, setFile] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState('');
    const [issueDate, setIssueDate] = React.useState('');
    const [ExpiryDate, setExpiryDate] = React.useState('');
    const [expiredCertificates, setExpiredCertificates] = React.useState([]);
    const [expiredTotalCount, setExpiredTotalCount] = React.useState(0);
    const [issuedCertificates, setIssuedCertificates] = React.useState([]);
    const [issuedTotalCount, setIssuedTotalCount] = React.useState(0);
    const [userDetails, setUserDetails] = React.useState(null);
    const [isResettingForm, setIsResettingForm] = React.useState(false);

    // Input of the uploaded file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreview(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    };

    // to get the Issue Date
    const handleDatePickerChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setIssueDate(formattedDate);
    };

    // to get the Expiry date
    const handleExpiryDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setExpiryDate(formattedDate);
    };

    // Form Data
    const onSubmit = (data) => {
        const newData = {
            ...data,
            certificateName: data.certificateType.nameOfCertificate,
            certicateNamePostFix: data.certificateType.valueOfCertificate,
            issuedDate: issueDate,
            validTill: ExpiryDate,
            association: data.association || 'Pentagon',
            evidence: file
        };
        const formdata = new FormData();
        Object.keys(newData).map(key => {
            formdata.append(key, newData[key]);
        });
        createCertificate(formdata);
        reset();
        setFile(null);
        setImagePreview('');
        setIsResettingForm(true);
        setTimeout(() => {
            setIsResettingForm(false);
        }, 3000);
    }

    const onSubmitAccountForm = async (data) => {
        const payload = {
            name: data.fullName,
            email: data.email
        }
        showLoading(true);
        try {
            const responseData = await updateUserDetails(payload);
            if (responseData) {
                toast.success("Updated Successfully");
            }
            showLoading(false);
        }
        catch (error) {
            showLoading(false);
            if (typeof (error.response.data) === 'object' && error.response.data.length) {
                toast.error(error.response.data[0] || 'An error occured');
            }
            else {
                toast.error(error.response.data.message || 'An error occured');
            }
        }
    }

    const onSubmitSecurityForm = async (data) => {
        if (!data.newPassword?.trim() || !data.confirmNewPassword?.trim() || !data.oldPassword?.trim()) {
            toast.error('Please enter all the required fields');
            return
        }
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error('Passwords do not match');
            return
        }
        const payload = {
            ...data
        }
        showLoading(true);
        try {
            const responseData = await changePassword(payload);
            if (responseData && responseData.data && responseData.data.success) {
                toast.success("Password changed successfully");
            }
            showLoading(false);
        }
        catch (error) {
            showLoading(false);
            if (typeof (error.response.data) === 'object' && error.response.data.length) {
                toast.error(error.response.data[0] || 'An error occured');
            }
            else {
                toast.error(error.response.data.message || 'An error occured');
            }
        }
    }

    // Create Certificate
    const createCertificate = async (data) => {
        showLoading(true);
        try {
            const responseData = await generateCertificate(data);
            if (responseData) {
                toast.success("Generated Successfully");
            }
            showLoading(false);
        }
        catch (error) {
            showLoading(false);
            if (typeof (error.response.data) === 'object' && error.response.data.length) {
                toast.error(error.response.data[0] || 'An error occured');
            }
            else {
                toast.error(error.response.data.message || 'An error occured');
            }
        }
    }

    // getExpiryCertificates
    const getExpiringCertificates = async (pagination) => {
        showLoading(true);
        try {
            const responseData = await getExpiredCertificates(pagination);
            setExpiredTotalCount(responseData.data.totalCount);
            setExpiredCertificates(responseData.data.certificates);
            showLoading(false);
            if (responseData) {
            }
        }
        catch (error) {
            showLoading(false);
            console.log("not found", error);
        }
    }

    // getIssuedCertificates
    const getIssuedCertificates = async (pagination) => {
        showLoading(true);
        try {
            const responseData = await getIssueCertificates(pagination);
            setIssuedTotalCount(responseData.data.totalCount);
            setIssuedCertificates(responseData.data.certificates);
            showLoading(false);
            if (responseData) {
            }
        }
        catch (error) {
            showLoading(false);
            console.log("not found", error);
        }
    }

    // getIssuedCertificates
    const getAccountDetails = async () => {
        showLoading(true);
        try {
            const responseData = await getUserDetails();
            setUserDetails(responseData.data.user);
            showLoading(false);
        }
        catch (error) {
            showLoading(false);
            console.log("not found", error);
        }
    }

    // Show the loader 
    const show = () => {
        setTimeout(() => {
            showLoading(false);
        }, 3000);
    };

    return (
        <DashboardContext.Provider
            value={{
                file,
                handleFileChange,
                handleDatePickerChange,
                handleExpiryDateChange,
                onSubmit,
                imagePreview,
                getExpiringCertificates,
                expiredCertificates,
                getIssuedCertificates,
                issuedCertificates,
                show,
                expiredTotalCount,
                issuedTotalCount,
                isResettingForm,
                onSubmitAccountForm,
                userDetails,
                getAccountDetails,
                onSubmitSecurityForm
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
};