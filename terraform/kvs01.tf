resource "azurerm_key_vault" "kvs01" {
  name                        = "kvs01"
  resource_group_name         = "rg-01"
  location                    = "eastus2"
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  enabled_for_disk_encryption = "true"
  soft_delete_retention_days  = "7"
  purge_protection_enabled    = "true"
  sku_name                    = "standard"
  enable_rbac_authorization   = "true"
}
