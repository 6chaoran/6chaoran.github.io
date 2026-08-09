# Security Notes

## Reporting

Please report a security or privacy issue privately to the site owner through the contact method listed on <https://www.ichaoran.com/about/>. Do not open a public issue containing credentials, private data, or an exploitable vulnerability.

## Repository secrets

- Never commit API admin keys, write keys, service-account files, access tokens, private keys, or analytics exports.
- Store local secrets outside the repository or in ignored files and use the deployment platform's encrypted secret store in CI.
- Algolia search-only keys are designed for browser use, but admin/write keys are secrets. Restrict any search key to the intended index and operations.
- If a secret is committed, revoke or rotate it first; removing it from the latest commit is not sufficient.

The legacy local filename `_algolia_api_key` is ignored by the repository. It should contain only the credential needed by an explicitly invoked indexing workflow and must never be copied into documentation, logs, or generated pages.
