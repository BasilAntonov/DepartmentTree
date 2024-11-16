import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import departmentStore from "../stores/DepartmentStore";

interface LabelProps {
    label: string
}

const Label = styled.span`
    background-color: yellow;
`

const DepartmentLabel: React.FC<LabelProps> = observer(({ label }) => {
    const str = departmentStore.searchQuery;
    const index = label.indexOf(str);

    return (
        <>
            {
                index === -1 || !str
                    ? label
                    : <>
                        {label.substring(0, index)}
                        <Label>{label.substring(index, index + str.length)}</Label>
                        {label.substring(index + str.length)}
                    </>
            }
        </>
        // <>{label}</>
    );
});

export default DepartmentLabel;