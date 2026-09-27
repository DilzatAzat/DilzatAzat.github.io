# Harness Staging

This directory keeps auditable copies of the four requested SOP Skills and custom-agent TOMLs.

The official paths were attempted in order:

1. `C:\Users\ROG\.agents\skills` (global): blocked by the current sandbox ACL.
2. `<repo>\.agents\skills` (project): the root directory could be created, but its ACL denies creating Skill subdirectories and writing files.
3. `<repo>\.codex\agents` and `C:\Users\ROG\.codex\agents` (custom agents): both are protected and cannot be created.

No unsupported alternative path is claimed as discoverable. The TOML drafts use only the verified three-field custom-role shape: `name`, `description`, and `developer_instructions`.
