import { makeAutoObservable } from "mobx";

export interface Department {
    id: number;
    name: string;
    parent: number | null;
    children: Department[];
    isHighlighted: boolean;
}

class DepartmentStore {
    departments: Department[] = [];
    searchQuery: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setDepartments(departments: Department[]) {
        this.departments = departments;
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
        this.search();
    }

    private search() {
        this.highlightDepartments(this.departments, []);
        this.departments = [...this.departments];
    }

    private highlightDepartments(departments: Department[], departmentsParent: Department[]) {
        departments.forEach(department => {
            department.isHighlighted = department.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            if (department.isHighlighted) {
                for (let i = 0; i < departmentsParent.length; i++) {
                    const parent = departmentsParent[i];
                    parent.isHighlighted = true;
                }
            }
            if (department.children) {
                this.highlightDepartments(department.children, [...departmentsParent, department]);
            }
        });
    };

    get filteredDepartments() {
        if (!this.searchQuery) return this.departments;
        return this.departments.filter(department =>
            department.isHighlighted
        );
    }
}

const departmentStore = new DepartmentStore();
export default departmentStore;