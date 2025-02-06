import { useState } from "react";

const DropdownComponent = () => {
    const dropdownItems = ["Tool Name", "Category", "Subcategory"];
    const options = ["Option 1", "Option 2", "Option 3"];

    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedValues, setSelectedValues] = useState({
        "Tool Name": "Tool Name",
        Category: "Category",
        Subcategory: "Subcategory",
    });

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);
    };

    const handleOptionClick = (item, option) => {
        setSelectedValues({ ...selectedValues, [item]: option });
        setOpenDropdown(null);
    };

    return (
        <div className="flex flex-wrap justify-center gap-3">
            {dropdownItems.map((item) => (
                <div key={item} className="relative">
                    <div
                        onClick={() => toggleDropdown(item)}
                        className="flex bg-[#12181A] rounded-full border border-white border-opacity-10 py-2 px-4 items-center cursor-pointer"
                    >
                        <p className="text-white">{selectedValues[item]}</p>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${openDropdown === item ? "rotate-180" : ""
                                }`}
                        >
                            <path
                                d="M13.2292 7.5001L9.99583 10.7334L6.7625 7.5001C6.4375 7.1751 5.9125 7.1751 5.5875 7.5001C5.2625 7.8251 5.2625 8.3501 5.5875 8.6751L9.4125 12.5001C9.7375 12.8251 10.2625 12.8251 10.5875 12.5001L14.4125 8.6751C14.7375 8.3501 14.7375 7.8251 14.4125 7.5001C14.0875 7.18343 13.5542 7.1751 13.2292 7.5001Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    {openDropdown === item && (
                        <div className="absolute left-0 mt-2 w-40 bg-[#1E2528] text-white rounded-lg shadow-lg z-10">
                            <ul className="py-2">
                                {options.map((option) => (
                                    <li
                                        key={option}
                                        className="px-4 py-2 hover:bg-[#2A3336] cursor-pointer"
                                        onClick={() => handleOptionClick(item, option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DropdownComponent;
