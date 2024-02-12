terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.5"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "32793485-d6a3-422a-b9b6-457e2db0525d"
  tenant_id       = "b901cced-6335-4461-bdb4-037dd7e3460b"
  client_id       = "f5cb8c23-d862-42ea-822a-a8f8615cf618"
  client_secret   = "xnz8Q~HmfV8laKlnX.EsKwwKQw-NM27yUIXmociD"
}

data "azurerm_client_config" "current" {}
