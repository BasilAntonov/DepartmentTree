import React, { useEffect } from "react";
import departmentStore, { Department } from "./stores/DepartmentStore";
import DepartmentTree from "./components/DepartmentTree";
import data from './data/TreeData.json';

interface TreeNode {
    id: number, 
    parent: null | number,
    name: string
}

const buildTree = (data: TreeNode[]): Department[] => {
    const tree: {[key: number]: any} = {};
    data.forEach(item => {
        tree[item.id] = { ...item, children: [], isHighlighted: true };
    });
    Object.values(tree).forEach(item => {
        if (item.parent) {
            tree[item.parent].children.push(item);
        }
    });
    return Object.values(tree).filter(item => !item.parent);
};

const App: React.FC = () => {
    useEffect(() => {
        const treeData = buildTree(data.data);
        departmentStore.setDepartments(treeData);
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        departmentStore.setSearchQuery(query);
    };

    return (
        <div>
            <input type="text" placeholder="Поиск..." onChange={handleSearch} />
            <DepartmentTree />
        </div>
    );
};

export default App;