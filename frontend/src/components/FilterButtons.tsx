import { FilterType } from "../types/types";
interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtons = ({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) => {
  return (
    <div className="filter-container">
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            checked={currentFilter === "ALL"}
            onChange={() => onFilterChange("ALL")}
          />{" "}
          All
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            checked={currentFilter === "COMPLETED"}
            onChange={() => onFilterChange("COMPLETED")}
          />{" "}
          Completed
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            checked={currentFilter === "PENDING"}
            onChange={() => onFilterChange("PENDING")}
          />{" "}
          All
        </label>
      </div>
    </div>
  );
};

export { FilterButtons };
