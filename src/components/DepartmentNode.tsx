import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import DepartmentLabel from "./DepartmentLabel";


interface DepartmentNodeProps {
    department: {
        id: number;
        name: string;
        children: any[];
        isHighlighted?: boolean;
    };
}

interface RootNodeProps {
    isOpen: boolean;
    isHighlighted: boolean;
    thereClild: boolean;
}

const RootNode = styled.div<RootNodeProps>`
    cursor: ${({thereClild}) => thereClild ? 'pointer' : 'unset'};
    &:before {
        content: "${({isOpen}) => isOpen ? '\u2212' : '\u002b'}";
        visibility: ${({thereClild}) => thereClild ? 'visible' : 'hidden'};
        margin: 0rem 0.5rem;
    }
`
const ChildNode = styled.div`
    margin-left: 1.25rem
`

const DepartmentNode: React.FC<DepartmentNodeProps> = observer(({ department }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        department.isHighlighted && <>
            <RootNode
                onClick={toggleOpen}
                isOpen={isOpen}
                isHighlighted={!!department.isHighlighted}
                thereClild={!!department.children?.length}
            >
                <DepartmentLabel label={department.name}/>
            </RootNode>
            {isOpen && department.children && department.children.length > 0 && (
                <ChildNode>
                    {department.children.map(child => (
                        <DepartmentNode key={child.id} department={child} />
                    ))}
                </ChildNode>
            )}
        </>
    );
});

export default DepartmentNode;
