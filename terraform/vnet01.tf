resource "azurerm_virtual_network" "vnet01" {
  name                = "vnet01"
  location            = "australiaeast"
  resource_group_name = "rg-02"
  address_space       = ["10.0.0.0/16"]
  dns_servers         = ["10.0.0.4","10.0.0.5","10.0.0.6","10.0.0.7"]
}

