import React from "react";
import { observer } from "mobx-react-lite";
import DepartmentNode from "./DepartmentNode.tsx";
import departmentStore from "../stores/DepartmentStore";

const DepartmentTree: React.FC = observer(() => {
    const departments = departmentStore.departments;

    return (
        <>
            {departments.map(department => (
                <DepartmentNode key={department.id} department={department} />
            ))}
        </>
    );
});

export default DepartmentTree;