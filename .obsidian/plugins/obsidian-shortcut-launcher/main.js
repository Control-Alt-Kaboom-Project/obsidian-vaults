/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => ShortcutLauncherPlugin
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/SettingsTab.ts
var import_obsidian2 = __toModule(require("obsidian"));

// src/LauncherModal.ts
var import_obsidian = __toModule(require("obsidian"));
var LauncherModal = class extends import_obsidian.Modal {
  constructor(app, isEditing, commandName, shortcutName, inputTypes, separator, onSave) {
    super(app);
    this.isEditing = isEditing;
    this.commandName = commandName;
    this.shortcutName = shortcutName;
    this.inputTypes = inputTypes;
    this.separator = separator;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", {
      text: this.isEditing ? "Edit Launcher" : "New Launcher"
    });
    new import_obsidian.Setting(contentEl).setName("Command Name").setDesc("The Obsidian command name.").addText((text) => text.setPlaceholder("Command Name").setValue(this.commandName).onChange((value) => this.commandName = value));
    new import_obsidian.Setting(contentEl).setName("Shortcut Name").setDesc("The name of the shortcut to launch.").addText((text) => text.setPlaceholder("Shortcut Name").setValue(this.shortcutName).onChange((value) => this.shortcutName = value));
    new import_obsidian.Setting(contentEl).setName("Input Type").setDesc("The initial input into the shortcut.").addDropdown((dropdown) => dropdown.addOptions({
      "Selected Text": "Selected Text",
      "Selected Link/Embed Contents": "Selected Link/Embed Contents",
      "Current Paragraph": "Current Paragraph",
      "Entire Document": "Entire Document",
      "Link to Document": "Link to Document",
      "Document Name": "Document Name",
      "Document Path": "Document Path",
      Multiple: "Multiple"
    }).setValue(this.inputTypes[0]).onChange((value) => {
      if (value == "Multiple") {
        this.inputTypes = [
          "Multiple",
          "Document Name",
          "Selected Text"
        ];
      } else {
        this.inputTypes = [value];
      }
      this.onOpen();
    }));
    if (this.inputTypes.length > 1) {
      this.inputTypes.filter((_, index) => index > 0).forEach((inputType, index) => {
        let setting = new import_obsidian.Setting(contentEl).setName(`Input Type #${index + 1}`).addDropdown((dropdown) => dropdown.addOptions({
          "Selected Text": "Selected Text",
          "Selected Link/Embed Contents": "Selected Link/Embed Contents",
          "Current Paragraph": "Current Paragraph",
          "Entire Document": "Entire Document",
          "Link to Document": "Link to Document",
          "Document Name": "Document Name",
          "Document Path": "Document Path"
        }).setValue(inputType).onChange((value) => {
          this.inputTypes[index + 1] = value;
        }));
        if (index > 1) {
          setting.addButton((button) => button.setIcon("trash").setWarning().onClick(() => {
            this.inputTypes.splice(index + 1, 1);
            this.onOpen();
          }));
        }
      });
      new import_obsidian.Setting(contentEl).addButton((button) => button.setButtonText("Add Input").onClick(() => {
        this.inputTypes.push("Selected Text");
        this.onOpen();
      }));
      new import_obsidian.Setting(contentEl).setName("Separator").setDesc("The separator to insert between input types.").addText((text) => text.setValue(this.separator).onChange((value) => this.separator = value));
    }
    new import_obsidian.Setting(contentEl).addButton((button) => button.setButtonText("Save").setCta().onClick(() => {
      if (!this.commandName || this.commandName.length == 0) {
        return new import_obsidian.Notice("Specify a command name.");
      }
      if (!this.shortcutName || this.shortcutName.length == 0) {
        return new import_obsidian.Notice("Specify a shortcut name.");
      }
      this.onSave(this.commandName, this.shortcutName, this.inputTypes, this.separator);
      this.close();
    }));
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/SettingsTab.ts
var SettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Shortcut Launchers" });
    new import_obsidian2.Setting(containerEl).addButton((button) => button.setButtonText("New").setCta().onClick(() => {
      new LauncherModal(this.app, false, "", "", ["Selected Text"], ",", (commandName, shortcutName, inputTypes, separator) => {
        this.plugin.settings.launchers.splice(0, 0, {
          commandName,
          shortcutName,
          inputTypes,
          separator
        });
        this.plugin.saveSettings();
        this.display();
      }).open();
    }));
    this.plugin.settings.launchers.forEach((launcher, index) => {
      new import_obsidian2.Setting(containerEl).setName(launcher.commandName).setDesc(`${launcher.shortcutName} < ${launcher.inputTypes[0]}`).addButton((button) => button.setIcon("pencil").onClick((event) => {
        new LauncherModal(this.app, true, launcher.commandName, launcher.shortcutName, launcher.inputTypes, launcher.separator, (commandName, shortcutName, inputTypes, separator) => {
          this.plugin.settings.launchers[index].commandName = commandName;
          this.plugin.settings.launchers[index].shortcutName = shortcutName;
          this.plugin.settings.launchers[index].inputTypes = inputTypes;
          this.plugin.settings.launchers[index].separator = separator;
          this.plugin.saveSettings();
          this.display();
        }).open();
      })).addButton((button) => button.setIcon("trash").setWarning().onClick(() => {
        this.plugin.settings.launchers.splice(index, 1);
        this.plugin.saveSettings();
        this.display();
      }));
    });
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  launchers: []
};
var ShortcutLauncherPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.registeredCommands = [];
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new SettingsTab(this.app, this));
      yield this.createCommands();
    });
  }
  createCommands() {
    return __async(this, null, function* () {
      this.registeredCommands = [];
      this.settings.launchers.forEach((launcher) => {
        this.registeredCommands.push(this.addCommand({
          id: launcher.commandName.replace(/\s+/g, "-").toLowerCase(),
          name: launcher.commandName,
          checkCallback: (checking) => {
            if (checking) {
              return this.check(launcher);
            }
            var inputs = [];
            launcher.inputTypes.filter((inputType) => inputType != "Multiple").reduce((promise, inputType) => __async(this, null, function* () {
              var _a, _b;
              yield promise;
              var text = "";
              if (inputType == "Selected Text") {
                let view = this.app.workspace.activeLeaf.view;
                if (view.getSelection) {
                  text = view.getSelection();
                }
              } else if (inputType == "Selected Link/Embed Contents") {
                let metadataCache = this.app.metadataCache.getFileCache(this.app.workspace.getActiveFile());
                let linksAndEmbeds = ((_a = metadataCache.links) != null ? _a : []).concat((_b = metadataCache.embeds) != null ? _b : []);
                let mdView = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
                let cursorOffset = mdView.editor.posToOffset(mdView.editor.getCursor());
                let matchingLinkOrEmbed = linksAndEmbeds.filter((cached) => cached.position.start.offset <= cursorOffset && cached.position.end.offset >= cursorOffset);
                if (matchingLinkOrEmbed.length > 0) {
                  let linkpath = (0, import_obsidian3.getLinkpath)(matchingLinkOrEmbed[0].link);
                  let linkedFile = this.app.metadataCache.getFirstLinkpathDest(linkpath, this.app.workspace.getActiveFile().path);
                  if (!matchingLinkOrEmbed[0].link.contains(".") || linkpath.endsWith(".md") || linkpath.endsWith("txt")) {
                    text = yield this.app.vault.read(linkedFile);
                  } else {
                    let binary = yield this.app.vault.readBinary(linkedFile);
                    text = arrayBufferToBase64(binary);
                  }
                } else {
                  new import_obsidian3.Notice("Could not find current link or embed");
                }
              } else if (inputType == "Current Paragraph") {
                let metadataCache = this.app.metadataCache.getFileCache(this.app.workspace.getActiveFile());
                if (!metadataCache.sections) {
                  new import_obsidian3.Notice("Could not find current paragraph");
                }
                let mdView = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
                let cursorOffset = mdView.editor.posToOffset(mdView.editor.getCursor());
                let matchingSection = metadataCache.sections.filter((section) => section.position.start.offset <= cursorOffset && section.position.end.offset >= cursorOffset);
                if (matchingSection.length > 0) {
                  let documentContents = yield this.app.vault.read(this.app.workspace.getActiveFile());
                  text = documentContents.substring(matchingSection[0].position.start.offset, matchingSection[0].position.end.offset);
                } else {
                  new import_obsidian3.Notice("Could not find current paragraph");
                }
              } else if (inputType == "Entire Document") {
                text = yield this.app.vault.read(this.app.workspace.getActiveFile());
              } else if (inputType == "Link to Document") {
                text = `obsidian://open?vault=${encodeURIComponent(this.app.vault.getName())}&file=${encodeURIComponent(this.app.workspace.getActiveFile().path)}`;
              } else if (inputType == "Document Name") {
                text = this.app.workspace.getActiveFile().basename;
              } else if (inputType == "Document Path") {
                text = this.app.workspace.getActiveFile().path;
              }
              inputs.push(text);
            }), Promise.resolve()).then(() => {
              if (import_obsidian3.Platform.isMobileApp) {
                window.open(`shortcuts://run-shortcut?name=${encodeURIComponent(launcher.shortcutName)}&input=text&text=${encodeURIComponent(inputs.join(launcher.separator))}`);
              } else {
                let tempFilePath = require("path").join(require("os").tmpdir(), "obsidian-shortcut-launcher-temp-input");
                let escapedShortcutName = launcher.shortcutName.replace(/["\\]/g, "\\$&");
                let fs = require("fs");
                fs.writeFile(tempFilePath, inputs.join(launcher.separator), () => {
                  require("child_process").exec(`shortcuts run "${escapedShortcutName}" -i ${tempFilePath}`, () => __async(this, null, function* () {
                    fs.unlink(tempFilePath, () => {
                    });
                  }));
                });
              }
            });
            return true;
          }
        }));
      });
    });
  }
  check(launcher) {
    var _a, _b;
    if (launcher.inputTypes.contains("Selected Text")) {
      let view = this.app.workspace.activeLeaf.view;
      if (!view.getSelection) {
        return false;
      }
    }
    if (launcher.inputTypes.contains("Selected Link/Embed Contents")) {
      let mdView = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
      if (!mdView || mdView.getMode() !== "source") {
        return false;
      }
      let metadataCache = this.app.metadataCache.getFileCache(this.app.workspace.getActiveFile());
      let linksAndEmbeds = ((_a = metadataCache.links) != null ? _a : []).concat((_b = metadataCache.embeds) != null ? _b : []);
      if (typeof mdView.editor == "undefined") {
        return false;
      }
      let cursorOffset = mdView.editor.posToOffset(mdView.editor.getCursor());
      let matchingLinkOrEmbed = linksAndEmbeds.filter((cached) => cached.position.start.offset <= cursorOffset && cached.position.end.offset >= cursorOffset);
      if (matchingLinkOrEmbed.length == 0) {
        return false;
      }
    }
    if (launcher.inputTypes.contains("Current Paragraph")) {
      let mdView = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
      if (!mdView || mdView.getMode() !== "source") {
        return false;
      }
    }
    if (launcher.inputTypes.contains("Entire Document") || launcher.inputTypes.contains("Link to Document") || launcher.inputTypes.contains("Document Name") || launcher.inputTypes.contains("Document Path")) {
      if (!this.app.workspace.getActiveFile()) {
        return false;
      }
    }
    return true;
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
      this.registeredCommands.forEach((command) => {
        this.app.commands.removeCommand(command.id);
      });
      this.registeredCommands = [];
      yield this.createCommands();
    });
  }
};
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
