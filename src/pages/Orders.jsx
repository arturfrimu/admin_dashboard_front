import React from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Resize,
    Sort,
    ContextMenu,
    Filter,
    Page,
    ExcelExport,
    PdfExport,
    Edit,
    Inject
} from '@syncfusion/ej2-react-grids';

import {contextMenuItems, ordersGrid} from '../data/dummy';
import {Header} from '../components';
import product6 from "../data/product6.jpg";

const Orders = () => {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        // FIXME: MOVE TO API SERVICE
        fetch('http://localhost:8080/orders')
            .then(response => response.json())
            .then(json => {
                    const newOrders = json.map((order) => {
                        return {
                            OrderID: order.id,
                            CustomerName: order.customerName,
                            TotalAmount: order.totalAmount,
                            OrderItems: order.orderItems,
                            Location: order.location,
                            Status: order.status,
                            StatusBg: order.statusBg,
                            // TODO: ADD FUNCTIONALITY TO SERVER TO SAVE IMAGES
                            ProductImage: product6 //order.productImage
                        }
                    });
                    setOrders(newOrders)
                }
            )
    }, [])

    const editing = {allowDeleting: true, allowEditing: true};
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Orders"/>
            <GridComponent
                id="gridcomp"
                dataSource={orders}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={contextMenuItems}
                editSettings={editing}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
            </GridComponent>
        </div>
    );
};
export default Orders;
