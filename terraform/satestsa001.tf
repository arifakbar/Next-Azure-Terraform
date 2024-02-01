resource "azurerm_storage_account" "satestsa001" {
  name                     = "satestsa001"
  location                 = "eastus2"
  resource_group_name      = "rg-01"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
