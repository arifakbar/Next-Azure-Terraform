data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "@@resourceName@@" {
  name                        = "@@resourceName@@"
  resource_group_name         = "@@rgName@@"
  location                    = "@@location@@"
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  enabled_for_disk_encryption = "@@diskEnc@@"      #true 
  soft_delete_retention_days  = "@@softDelete@@"   #7
  purge_protection_enabled    = "@@purgeProtect@@" #true
  sku_name                    = "@@skuName@@"      #standard
  enable_rbac_authorization   = "@@rbacAuth@@"     #true
}
