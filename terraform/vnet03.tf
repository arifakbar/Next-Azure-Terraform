resource "azurerm_virtual_network" "vnet03" {
  name                = "vnet03"
  location            = "australiaeast"
  resource_group_name = "rg-02"
  address_space       = ["10.0.0.0/16"]
  dns_servers         = []
}

