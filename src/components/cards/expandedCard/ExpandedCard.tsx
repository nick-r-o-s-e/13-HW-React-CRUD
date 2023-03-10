import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import EditingForm from "../../formVariants/EditingForm";
import Recipe from "../../../assets/types/Recipe";

import "./expandedCard.scss";

interface Props {
  expanded: boolean;
  setExpanded: Function;
  recipe: Recipe;
  setRecipes: Function;
  id: number | string;
}

function ExpandedCard({
  expanded,
  setExpanded,
  recipe,
  setRecipes,
  id,
}: Props) {
  const [editingState, setEditingState] = useState(false);

  const removeExpanded = (target: HTMLElement) => {
    if (
      (target as HTMLElement).contains(target.querySelector(".expanded-card"))
    ) {
      setExpanded(false);
    }
  };

  const deleteRecipe = (id: number | string) => {
    axios.delete(`http://localhost:3004/recipes/${id}`);

    setExpanded(false);

    setRecipes((prevVal: Recipe[]) => {
      const newRecipes = [...prevVal].filter((recipe) => recipe.id != id);
      return newRecipes;
    });
  };

  const editRecipe = (id: number | string) => {
    setExpanded(false);
    setEditingState(true);
  };

  return (
    <div>
      <EditingForm
        state={editingState}
        setState={setEditingState}
        setRecipes={setRecipes}
        recipe={recipe}
      />
      <div
        className="expanded-div"
        style={{ display: expanded ? "block" : "none" }}
        onClick={(e) => {
          removeExpanded(e.target as HTMLElement);
        }}
      >
        <div className="card mb-3 expanded-card">
          <button
            className="action-btn edit-recipe-btn"
            onClick={(e) => {
              editRecipe(id);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>

          <button
            className="action-btn delete-recipe-btn"
            onClick={(e) => {
              deleteRecipe(id);
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>

          <div className="row g-0">
            <div
              className="col-md-3 img-fluid rounded-start image-div"
              style={{ backgroundImage: `url(${recipe.image})` }}
            ></div>

            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>

                <hr />

                <div className="details">
                  <div className="detail">
                    <h4>Servings:</h4>
                    <p>{recipe.servings}</p>
                  </div>

                  <div className="detail">
                    <h4>Prep Time:</h4>
                    <p>{recipe.prepTime}</p>
                  </div>

                  <div className="detail">
                    <h4>Cooc Time:</h4>
                    <p>{recipe.coocTime}</p>
                  </div>
                </div>

                <hr />

                <div className="main-content">
                  <div className="ingredients">
                    <h3>Ingredients</h3>

                    {recipe.ingredients.map((ingredient) => {
                      return (
                        <div key={uuidv4()} className="ingredient">
                          <h5>{ingredient[0]}</h5>
                          <p>{ingredient[1]}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="directions">
                    <h3>Directions</h3>

                    {recipe.directions.map((direction, i) => {
                      return (
                        <div key={uuidv4()} className="direction">
                          <h5>Step {i + 1}</h5>
                          <p>{direction}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedCard;
