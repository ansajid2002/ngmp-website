import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { AdminUrl } from '../constant';
import axios from 'axios';

const AdminSettings = () => {
    const [conversionRates, setConversionRates] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${AdminUrl}/api/getConversionRatesUSD`);
            if (response.ok) {
                const data = await response.json();
                setConversionRates(data[0]);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onFinish = (formData) => {
        // Create a copy of the current conversionRates
        const updatedConversionRates = { ...conversionRates };
        for (const key in formData) {
            // Update the conversion rate only if it's different from the current value
            if (formData[key] !== conversionRates[key]) {
                updatedConversionRates[key] = parseFloat(formData[key] || conversionRates[key]);
            }
        }

        axios.post(`${AdminUrl}/api/updateCurrencyValues`, { conversionRates: updatedConversionRates })
            .then((response) => {
                // Handle success
                fetchData();
                message.success('Conversion rates updated successfully');
            })
            .catch((error) => {
                // Handle error
                console.error('Failed to update conversion rates:', error);
            });
    };

    return (
        <div className="sm:p-4 sm:ml-64">
            <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                {conversionRates && Object.keys(conversionRates).slice(1).map((currency) => (
                    <Form.Item label={currency.toLocaleUpperCase()} name={currency} key={currency}>
                        <Input
                            type="number"
                            name={currency}
                            defaultValue={conversionRates[currency]}
                        />
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminSettings;
