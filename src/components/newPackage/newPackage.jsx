import React, { Component } from "react";
import {
  createNewPackage,
  getAllPackages,
  getCurrentUser,
} from "../../services/dataService";
import closeIcon from "../../images/dashboard/close.png";
import "./newPackage.css";
import { toast } from "react-toastify";

class NewPackage extends Component {
  state = {
    user: {},
    data: {
      owner: "",
      carrier: "",
      name: "",
      category: "",
      delivery_period: "",
      description: "",
      dest_address: "",
      pick_address: "",
      destination: "",
      origin: "",
      package_image: null,
      price: "",
      priority: "",
      weight: "",
      origin: "",
      weight: "",
    },
  };

  async componentDidMount() {
    const user = await getCurrentUser();
    this.setState({ user });
  }

  handleDetailClose = () => {
    this.props.history.push("/packages/all");
  };

  handleInput = (e) => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleImageInput = (e) => {
    const package_image = e.target.files[0];
    const data = { ...this.state.data };
    data.package_image = package_image;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...this.state.data };
    data.owner = this.state.user.id;
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const newPackage = await createNewPackage(formData);
      console.log(newPackage);
      // add new packages to package list in state
      toast("Package added successfully");
      this.props.history.push(`/package/${newPackage.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      name,
      category,
      delivery_period,
      description,
      dest_address,
      pick_address,
      destination,
      origin,
      price,
      priority,
      weight,
    } = this.state.data;

    return (
      <div className="add-package-page">
        <div className="add-package-main animate">
          <h2 className="page-title">Add new Package </h2>
          <img
            onClick={this.handleDetailClose}
            src={closeIcon}
            alt="close"
            className="close"
          />
          <form onSubmit={this.handleSubmit} className="package-form">
            <div className="input-group">
              <div className="input">
                <label htmlFor="dest_address">Package name</label>
                <input
                  onInput={this.handleInput}
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                />
              </div>
              <div className="input">
                <label htmlFor="description">priority</label>
                <select
                  onChange={this.handleInput}
                  name="priority"
                  id="priority"
                  value={priority}
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <div className="input">
                <label htmlFor="pick_address">Pick-up Address</label>
                <input
                  onInput={this.handleInput}
                  type="text"
                  name="pick_address"
                  id="pick_address"
                  value={pick_address}
                />
              </div>
              <div className="input">
                <label htmlFor="dest_address">Dilevery Address</label>
                <input
                  onInput={this.handleInput}
                  type="text"
                  name="dest_address"
                  id="dest_address"
                  value={dest_address}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input">
                <label htmlFor="origin">Origin (city)</label>
                <span className="input-wrapper">
                  <input
                    onInput={this.handleInput}
                    type="text"
                    name="origin"
                    id="origin"
                    value={origin}
                  />
                </span>
              </div>

              <div className="input">
                <label htmlFor="destination">Destination (city)</label>
                <span className="input-wrapper">
                  <input
                    onInput={this.handleInput}
                    type="text"
                    name="destination"
                    id="destination"
                    value={destination}
                  />
                </span>
              </div>
            </div>

            <div className="input-group">
              <div className="input">
                <label htmlFor="delivery_period">Dilevery Period</label>
                <span className="input-wrapper">
                  <input
                    onInput={this.handleInput}
                    type="text"
                    name="delivery_period"
                    id="delivery_period"
                    value={delivery_period}
                  />
                  <span className="unit-container">Days</span>
                </span>
              </div>

              <div className="input">
                <label htmlFor="cost">cost</label>
                <span className="input-wrapper">
                  <input
                    onInput={this.handleInput}
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                  />
                  <span className="unit-container">NGN</span>
                </span>
              </div>
            </div>

            <div className="input-group">
              <div className="input">
                <label htmlFor="category">Category</label>
                <select
                  onChange={this.handleInput}
                  name="category"
                  id="category"
                  value={category}
                >
                  <option value="CLOTHS">CLOTHS</option>
                  <option value="DOCUMENTS">DOCUMENTS</option>
                  <option value="GROCERY">GROCERY</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="weight">Weight</label>
                <span className="input-wrapper">
                  <input
                    onInput={this.handleInput}
                    type="text"
                    name="weight"
                    id="weight"
                    value={weight}
                  />
                  <span className="unit-container">KG</span>
                </span>
              </div>
            </div>

            <div className="input-group">
              <div className="input">
                <label htmlFor="description">Other info</label>
                <input
                  onInput={this.handleInput}
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input">
                <label htmlFor="package_image">Package Image</label>
                <input
                  onInput={this.handleImageInput}
                  type="file"
                  name="package_image"
                  id="package_image"
                />
              </div>
            </div>
            <div className="submit-group">
              <input className="submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPackage;
