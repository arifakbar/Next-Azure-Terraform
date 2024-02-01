resource "azurerm_virtual_network" "vnet02" {
  name                = "vnet02"
  location            = "eastus2"
  resource_group_name = "rg-01"
  address_space       = ["10.0.0.0/16"]
  dns_servers         = []
}

