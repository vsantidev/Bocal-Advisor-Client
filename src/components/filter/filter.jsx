import { useState, useEffect } from "react";
const items = [
    {
        name: "Prada",
        name_category: "restaurants"
    },
    {
        name: "Gucci",
        name_category: "bars"
    },
    {
        name: "ROlex",
        name_category: "desserts"
    },
    {
        name: "Tutu",
        name_category: "boulangeries"
    }
]


function Filter() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        filterItems();
    }, [selectedFilters])

    let filters = ["restaurants", "bars" , "desserts", "boulangeries", "fastFoods"]
/*     let repas = ["petitDejeuner", "brunch" , "dejeuner", "diner"]
    let note = ["one", "two" , "three", "four", "five"] */
    
    const handleFilterButtonClick = (selectedCategory) => {
/*         console.log("after : " , selectedFilters );
        console.log("selectedCategory : ",selectedCategory); */
        if (selectedFilters.includes(selectedCategory)) {
            
           /*  console.log("if : ", selectedCategory); */
            let filters =  selectedFilters.filter((el) => el !== selectedCategory);
            /* console.log("if 3 : ", filters); */
            setSelectedFilters(filters);
            /* console.log('handle', selectedFilters); */
        } else {
            console.log("else : ", selectedCategory);
            setSelectedFilters([...selectedCategory, selectedCategory]);
        }
    }

    const filterItems = () => {
        if (selectedFilters.length > 0 ) {
            let tempItems = selectedFilters.map((selectedCategory) => {
                let temp = items.filter((item) => item.name_category === selectedCategory)
                return temp;
            });
            setFilteredItems(tempItems.flat());
        } else {
            setFilteredItems([...items]);
        }
    }
    
    return (
        <div className="filter">
{/*             <div className="typeEtablissement">
                <h3>Type d'établissement</h3>
                <div>
                    <input type="checkbox" name="restaurants" id="restaurants" />
                    <label htmlFor="restaurants">Restaurants</label>
                </div>
                <div>
                    <input type="checkbox" name="bars" id="bars"/>
                    <label htmlFor="bars">Bars</label>
                </div>
                <div>
                    <input type="checkbox" name="desserts" id="desserts"/>
                    <label htmlFor="desserts">Desserts</label>
                </div>
                <div>
                    <input type="checkbox" name="boulangeries" id="boulangeries"/>
                    <label htmlFor="boulangeries">Boulangeries</label>
                </div>
                <div>
                    <input type="checkbox" name="fastFoods" id="fastFoods"/>
                    <label htmlFor="fastFoods">Fast Foods</label>
                </div>
            </div>

            <div className="repas">
                
                <h3>Repas</h3>

                <div>
                    <input type="checkbox" name="petitDejeuner" id="petitDejeuner"/>
                    <label htmlFor="petitDejeuner">Petit Déjeuner</label>
                </div>
                <div>
                    <input type="checkbox" name="brunch" id="brunch"/>
                    <label htmlFor="brunch">Brunch</label>
                </div>
                <div>
                    <input type="checkbox" name="dejeuner" id="dejeuner"/>
                    <label htmlFor="dejeuner">Déjeuner</label>
                </div>
                <div>
                    <input type="checkbox" name="diner" id="diner"/>
                    <label htmlFor="diner">Diner</label>
                </div>
                
            </div>

            <div className="note">
                
                <h3>Notes</h3>

                <div>
                    <input type="checkbox" name="one" id="one"/>
                    <label htmlFor="one">1</label>
                </div>
                <div>
                    <input type="checkbox" name="two" id="two"/>
                    <label htmlFor="two">2</label>
                </div>
                <div>
                    <input type="checkbox" name="three" id="three"/>
                    <label htmlFor="three">3</label>
                </div>
                <div>
                    <input type="checkbox" name="four" id="four"/>
                    <label htmlFor="four">4</label>
                </div>
                <div>
                    <input type="checkbox" name="five" id="five"/>
                    <label htmlFor="five">5</label>
                </div>
            </div>
 */}
            <div className="typeEtablissement">
                {filters.map((name_category, idx) => (
                    <button 
                        onClick={() => handleFilterButtonClick(name_category)}
                            className= {`button ${
                                selectedFilters?.includes(name_category) ? "active" : ""
                            }`}
                        key={`filters-${idx}`}
                        >

                            {name_category}

                    </button>
                    ))}
            </div>

            <div>
                {filteredItems.map((item, idx) => (
                    <div key={`items-${idx}`} className="item">
                        <p>{item.name}</p>
                        <p className="category">{item.name_category}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Filter;