import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  getItems,
  saveItem,
  updateItem,
  deleteItem,
} from "../services/localStorageService";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// Dinamik importlar: sunucuda yüklenmesini engellemek için false  değeri
const Form = dynamic(() => import("../components/Form"), { ssr: false });
const List = dynamic(() => import("../components/List"), { ssr: false });
const Dropdown = dynamic(
  () => import("primereact/dropdown").then((mod) => mod.Dropdown),
  { ssr: false }
);
const Paginator = dynamic(
  () => import("primereact/paginator").then((mod) => mod.Paginator),
  { ssr: false }
);
const Dialog = dynamic(
  () => import("primereact/dialog").then((mod) => mod.Dialog),
  { ssr: false }
);
import { Button } from "primereact/button";
const Home = () => {
  const [items, setItems] = useState(getItems());
  const [sortOrder, setSortOrder] = useState("null");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const itemsPerPage = 5;
  const toastRef = useRef(null);

  const handleSave = (item) => {
    if (editItem) {
      updateItem(item);
      setItems(getItems());
    } else {
      saveItem(item);
      setItems(getItems());
    }
    setDisplayDialog(false);
    setEditItem(null);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: `${item.name} ${editItem ? "updated" : "added"}`,
    });
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setDisplayDialog(true);
  };

  // const handleUpdate = (updatedItem) => {
  //   updateItem(updatedItem);
  //   setItems(getItems());
  // };

  const handleDelete = (id, name) => {
    deleteItem(id);
    setItems(getItems());
    toastRef.current.show({
      severity: "success",
      summary: "Deleted",
      detail: `${name} removed`,
    });
  };

  const handleRead = (item) => {
    setEditItem(item);
    setIsReadOnly(true);
    setDisplayDialog(true);
  };

  // items adında bir anahtar (key) ile updatedItems değeri localStorage'e kaydedildi
  const handleVote = (id, voteType) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          votes: voteType === "up" ? item.votes + 1 : item.votes - 1,
          lastVoted: new Date().toISOString(),
        };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const sortedItems = items.sort((a, b) => {
    if (a.votes === b.votes) {
      return new Date(b.lastVoted) - new Date(a.lastVoted);
    }
    return sortOrder === "desc" ? b.votes - a.votes : a.votes - b.votes;
  });

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortOptions = [
    { label: "Sort by", value: null },
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
  ];

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  const showDialog = () => {
    setDisplayDialog(true);
    setEditItem(null);
    setIsReadOnly(false);
  };

  const confirmDelete = (id, name) => {
    setSelectedItemId(id);
    confirmDialog({
      message: `Do you want to remove ${name}?`,
      header: "Remove Link",
      accept: () => handleDelete(id, name),
      reject: () => setSelectedItemId(null),
    });
  };

  return (
    <div className="container">
      <div>
        <div>
          <div className="submitForm">
            <Button
              icon="pi pi-plus"
              outlined
              className="submit-btn"
              onClick={showDialog}
              aria-label="Plus"
            />
            <h2>Submit a Link</h2>
          </div>
          <Dialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            header={
              editItem
                ? isReadOnly
                  ? "View Link"
                  : "Edit Link"
                : "Add New Link"
            }
            style={{ width: "25vw" }}
            breakpoints={{ "1024px": "50vw", "960px": "75vw", "641px": "97vw" }}
          >
            <Form
              onSave={handleSave}
              defaultValues={editItem || { name: "", url: "" }}
              isReadOnly={isReadOnly}
            />
          </Dialog>
        </div>
        {items.length > 0 && (
          <Dropdown
            value={sortOrder}
            options={sortOptions}
            onChange={(e) => setSortOrder(e.value)}
            placeholder="Sort by"
          />
        )}
        <List
          items={paginatedItems}
          onVote={handleVote}
          onDelete={confirmDelete}
          onEdit={handleEdit}
          onRead={handleRead}
        />
      </div>
      <div>
        {items.length > 0 && (
          <Paginator
            first={(currentPage - 1) * itemsPerPage}
            rows={itemsPerPage}
            totalRecords={sortedItems.length}
            onPageChange={onPageChange}
          />
        )}
      </div>
      <Toast ref={toastRef} />
      <ConfirmDialog />
    </div>
  );
};

export default Home;
