import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const List = ({ items, onVote, onDelete }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="item">
          <div className="item-left">
            <h3>{item.votes}</h3>
            <p>Points</p>
          </div>
          <div className="item-right">
            <h3>{item.name}</h3>
            <p>
              {/* rel="noopener noreferrer" */}
              <a
                href={item.url}
                style={{ textDecoration: "none", color: "rgb(0 28 64)" }}
                target="_blank"
              >
                {item.url}
              </a>
            </p>
            <div className="custom-button">
              <i
                onClick={() => onVote(item.id, "up")}
                className="pi pi-arrow-up"
                title="Up Vote"
              >
                Up Vote
              </i>
              <i
                onClick={() => onVote(item.id, "down")}
                className="pi pi-arrow-down"
                title="Down Vote"
              >
                Down Vote
              </i>
            </div>
            <i
              onClick={() => onDelete(item.id, item.name)}
              className="pi pi-trash delete-button"
              title="Delete"
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
