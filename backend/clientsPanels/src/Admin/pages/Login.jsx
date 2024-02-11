import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUrl, adminData, links } from '../constant';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Form, Input, Button, Checkbox, Image, Modal } from 'antd';

const Login = () => {

    const [adminLoginData, setadminLoginData] = useState(null);
    const [adminData_backend, setDAta] = useState(null);
    const [filteredLinks, setfilteredLinks] = useState([]);
    const [error, seterror] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [qrcode, setQrcode] = useState(null);
    const [secret, setSecret] = useState(null);
    const [auth_code, setauthcode] = useState(null);


    const fetchSecretQr = async () => {
        try {
            const response = await fetch(`${AdminUrl}/api/totp-secret`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json()
                setQrcode(data?.Qrcode)
                setSecret(data?.secret)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        const { email, password } = values;
        setLoading(true);

        try {
            const response = await fetch(`${AdminUrl}/api/superadminLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data_response = await response.json();
            console.log(data_response);
            if (data_response?.status === 200) {
                const { data } = data_response
                setDAta(data)

                if (data.email === 'pwscoding@gmail.com') {
                    console.log(data, 'inside');
                    Cookies.set('adminData', data?.loggedId);
                    let timerInterval;
                    Swal.fire({
                        title: 'Logged Successfully',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            timerInterval = setInterval(() => {
                                window.location.href = filteredLinks.length > 0 ? filteredLinks[0] : '/Admin/404';
                            }, 1500);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    })
                } else {
                    setModalVisible(true)
                    if (!data.secret_key) {
                        fetchSecretQr()
                    }
                }

            } else if (data?.error) {
                Swal.fire({
                    title: 'Internal Server Error..',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                let timerInterval;
                Swal.fire({
                    title: data.message,
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            // window.location.href = '/Admin'
                        }, 1000);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     const fetchSecretQr = async () => {
    //         try {
    //             const response = await fetch(`${AdminUrl}/api/totp-secret`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setQrcode(data?.Qrcode)
    //                 setSecret(data?.secret)
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchSecretQr()
    // }, [])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getFilteredLinks = () => {
        return (
            adminLoginData?.[0]?.role_id?.length > 0
                ? links[0].links?.flatMap((link) => {
                    if (adminLoginData[0].role_id.includes(link.id)) {
                        return link.to ? [link.to] : link.dropList?.map((drplist) => drplist.to);
                    }
                    return null;
                }).filter((toValue) => toValue !== null)
                : []
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsondata = await adminData();
                console.log(jsondata);
                if (jsondata?.error) {
                    seterror(true);
                } else if (jsondata && jsondata?.length > 0) {
                    setadminLoginData(jsondata);
                }
            } catch (err) {
                console.log(err);
                seterror(true);
            }
        };

        setfilteredLinks(getFilteredLinks());

        if (adminLoginData?.length === 0 || adminLoginData == null || adminLoginData == undefined) {
            fetchData();
        } else {
            error
                ? Swal.fire({
                    icon: 'error',
                    title: 'Internal Server Error',
                    text: 'Something went wrong on the server side.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
                : (window.location.href = filteredLinks.length > 0 ? filteredLinks[0] : '/Admin/404');
        }
    }, [adminLoginData, error]);

    const handleOkVerify = async () => {
        try {
            // 1. send secret and token auth_code, admin id to backend
            const response = await fetch(`${AdminUrl}/api/checkAdmin2FA`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_id: adminData_backend?.id,
                    secret,
                    auth_code
                }),
            });

            if (response.ok) {
                Cookies.set('adminData', adminData_backend?.loggedId);
                let timerInterval;
                Swal.fire({
                    title: 'Logged Successfully',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            window.location.href = filteredLinks.length > 0 ? filteredLinks[0] : '/Admin/404';
                        }, 1500);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Code...',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className=' w-full max-w-md'>
                <div className='flex justify-center mb-5'>
                    <Image nonce='false' src='/mainlogovertical.png' width={150} height={150} />
                </div>
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
                    <Form
                        name="loginForm"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type='email' placeholder="Email" className="w-full mb-4 px-3 py-2 border rounded" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Password" className="w-full mb-4 px-3 py-2 border rounded" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 flex justify-center items-center">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <Modal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                title={'2FA Verification'}
                okText='Verify'
                onOk={handleOkVerify}
                okButtonProps={{ style: { background: 'green' } }}
            >
                <div className='flex flex-col justify-center w-full p-2'>
                    <h1 className='text-center text-xl font-semibold'>Two Step Verification</h1>
                    {
                        adminData_backend && !adminData_backend.secret_key && <div className='flex  justify-center w-full'>
                            <Image src={qrcode} width={200} height={200} />
                        </div>
                    }

                    <Input type='number' placeholder="Enter Code receive on Authenticator App" className="w-full mb-4 px-3 py-2 border rounded" onChange={(e) => setauthcode(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
};

export default Login

{/* <div className='flex flex-col justify-center w-full'>
<h1 className='text-center text-xl font-semibold'>Two Step Verification</h1>
<div className='flex flex-col justify-center w-full'>
    <Image src={qrcode} width={200} height={200} />
</div>
<Form.Item
    name="auth_code"
    rules={[{ required: true, message: 'Please input code' }]}
>
    <Input type='number' placeholder="Enter Code receive on Authenticator App" className="w-full mb-4 px-3 py-2 border rounded" />
</Form.Item>
</div> */}