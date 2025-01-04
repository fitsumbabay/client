import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://back-end-y5ny.onrender.com/api/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const itemsData = Array.isArray(response.data) ? response.data : [];
      setItems(itemsData);
    } catch (error) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]); // refetch if the token changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate price as a number
    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number");
      setLoading(false);
      return;
    }

    try {
      if (editingItemId) {
        await axios.put(
          `https://back-end-y5ny.onrender.com/api/items/${editingItemId}`,
          {
            name,
            description,
            price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(
          items.map((item) =>
            item._id === editingItemId
              ? { ...item, name, description, price }
              : item
          )
        );
        setEditingItemId(null);
      } else {
        const response = await axios.post(
          "https://back-end-y5ny.onrender.com/api/items",
          {
            name,
            description,
            price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems([...items, response.data]);
      }
      resetForm();
    } catch (error) {
      setError("Error saving item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://back-end-y5ny.onrender.com/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      setError("Error deleting item");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setEditingItemId(item._id);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setError("");
  };

  if (!token) {
    return <Typography variant="h6">You need to log in first.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Item Manager
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : editingItemId ? (
            "Update Item"
          ) : (
            "Add Item"
          )}
        </Button>
        {editingItemId && (
          <Button
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              setEditingItemId(null);
              resetForm();
            }}
          >
            Cancel
          </Button>
        )}
      </form>
      <Paper sx={{ mt: 3, p: 2 }}>
        <List>
          {items.map((item) => (
            <ListItem
              key={item._id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={`${item.description} - $${parseFloat(
                  item.price
                ).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ItemManager;
