import React, {useState} from 'react';
import {GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page} from '@syncfusion/ej2-react-grids';

import {employeesGrid} from '../data/dummy';
import {Header} from '../components';
import avatar from '../data/avatar3.png'

const Employees = () => {
    const [employees, setEmployees] = React.useState([]);
    const toolbarOptions = ['Search'];

    const editing = {allowDeleting: true, allowEditing: true};

    React.useEffect(() => {
        // FIXME: MOVE TO API SERVICE
        fetch('http://localhost:8080/employees')
        .then(response => response.json())
            .then(json => {
                const newEmployees = json.map((employee) => {
                    return {
                        EmployeeID: employee.id,
                        Name: employee.name,
                        Title: employee.title,
                        HireDate: employee.hireDate,
                        Country: employee.country,
                        ReportsTo: employee.reportsTo,
                        // TODO: ADD FUNCTIONALITY TO SERVER TO SAVE IMAGES
                        EmployeeImage: avatar //employee.employeeImage
                    }
                });
                setEmployees(newEmployees)
            }
    )
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Employees"/>
            <GridComponent
                dataSource={employees}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{pageCount: 5}}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]}/>

            </GridComponent>
        </div>
    );
};
export default Employees;
