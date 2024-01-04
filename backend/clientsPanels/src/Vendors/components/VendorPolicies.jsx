import React, { useState, useRef, useMemo, useEffect } from 'react';
// import { Accordion, AccordionItem } from '@reach/accordion';
// import { Dialog } from '@reach/dialog';
// import '@reach/dialog/styles.css';
import JoditEditor from 'jodit-react';
import { Radio, Tabs } from 'antd';
import { AdminUrl } from '../../Admin/constant';
import Swal from 'sweetalert2';


const VendorPolicies = ({ vendorDatastate }) => {

    const id = 999
    console.log(id, "id");

    const editor1 = useRef(null);
    const editor2 = useRef(null);
    const editor3 = useRef(null);
    const [shipping, setShipping] = useState('');
    const [returnpolicy, setReturnpolicy] = useState('')
    const [businessPolicy, setBusinessPolicy] = useState('')

    console.log(businessPolicy, "businessPolicy");
    const handlebusinesspolicy = async () => {
        try {
            if (businessPolicy === "") {
                alert("empty business Policy")
            }
            else {

                const response = await fetch(`${AdminUrl}/api/updateBusinessPolicy`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "vendor_id": id,
                        "business_policy": businessPolicy
                    }),
                });
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Business Policy Updated",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                    //   setBusinessPolicy("")
                }


                else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Update Business Policy",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                }
            }

        }
        catch {
            console.log(error, "Error While updating Business Policy");
        }
    }
    const handleShipping = async () => {
        try {
            if (shipping === "") {
                alert("empty Shipping Policy")
            }
            else {
                const response = await fetch(`${AdminUrl}/api/updateShippingInfo`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "vendor_id": id,
                        "shipping_information": shipping
                    }),
                });
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Shipping Policy Updated",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                    // setShipping("")
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Update Shipping Policy",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                }
            }
        }
        catch {
            console.log("Error While updating Shipping Policy");
        }
    }

    const handleReturnpolicy = async () => {
        try {
            if (returnpolicy === "") {
                alert("empty Return Policy")
            }
            else {
                const response = await fetch(`${AdminUrl}/api/updateReturnPolicy`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "vendor_id": id,
                        "return_policy": returnpolicy
                    }),
                });
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Return Policy Updated",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                    // setReturnpolicy("")
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Update Return Policy",
                        showConfirmButton: false,
                        timer: 2000, // Adjust the timer as needed})
                    })
                }

            }
        }
        catch {
            console.log(error, "Error While updating Return Policy");
        }
    }


    const Editor1 = ({ isOpen, onClose }) => {
        return (
            <div>
                <JoditEditor
                    ref={editor1}
                    value={shipping}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setShipping(newContent)}
                />
                <div className='space-x-4 space-y-2 my-4'>
                    <button onClick={() => setShipping("")} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-red-500 hover:bg-red-600'>Clear</button>
                    <button onClick={() => handleShipping()} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-green-500 hover:bg-green-600'>Save</button>
                </div>
            </div>
        );
    };
    const Editor2 = ({ isOpen, onClose }) => {
        return (
            <div>

                <JoditEditor
                    ref={editor2}
                    value={returnpolicy}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setReturnpolicy(newContent)}
                />
                <div className='space-x-4 space-y-2 my-4'>
                    <button onClick={() => setReturnpolicy("")} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-red-500 hover:bg-red-600'>Clear</button>
                    <button onClick={() => handleReturnpolicy()} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-green-500 hover:bg-green-600'>Save</button>
                </div>
            </div>
        );
    };
    const Editor3 = ({ isOpen, onClose }) => {
        return (
            <div>

                <JoditEditor
                    ref={editor3}
                    value={businessPolicy}
                    // config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setBusinessPolicy(newContent)}

                />
                <div className='space-x-4 space-y-2 my-4'>
                    <button onClick={() => setBusinessPolicy("")} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-red-500 hover:bg-red-600'>Clear</button>
                    <button onClick={() => handlebusinesspolicy()} className='text-xl rounded-md w-[100px] p-1 text-white font-medium bg-green-500 hover:bg-green-600'>Save</button>
                </div>
            </div>
        );
    };
    const items = [
        {
            id: 1,
            label: "Shipping Address",
            children: <Editor1 />
        },
        {
            id: 2,
            label: "Return Policy",
            children: <Editor2 />
        },
        {
            id: 3,
            label: "Business Policy",
            children: <Editor3 />
        }
    ]

    useEffect(() => {
        const getPolicies = async () => {
            const policies = await fetch(`${AdminUrl}/api/getpoliciesbyVendorid?vendor_id=${id}`)
            if (policies.ok) {
                const response = await policies.json()
                console.log(response, "response");
                if (response.data[0].shipping_information) {
                    setShipping(response.data[0].shipping_information)
                }
                if (response.data[0].return_policy) {
                    setReturnpolicy(response.data[0].return_policy)
                }
                if (response.data[0].business_policy) {
                    setBusinessPolicy(response.data[0].business_policy)
                }
            }
            else {
                console.log('error')
            }
        }

        id && getPolicies()
    }, [id])


    return (
        <div>

            <div className="text-xl font-bold my-2" >Vendor Policies</div>
            <section>
                <div>

                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        items={items?.map((single) => {
                            return {
                                label: single.label,
                                key: single.id,
                                children: single.children,
                            };
                        })}
                    />
                </div>
            </section>

        </div>
    )
}

export default VendorPolicies


