import moment from "moment";

export const getreadabledate =(date:string)=>{
   return  moment(date).fromNow()
}


export function parseEnvToList(envContent: string): { title: string; value: string }[] {
  return envContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const [key, ...rest] = line.split("=");
      let value = rest.join("=").trim();

      // Remove wrapping quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      return { title: key.trim(), value };
    });
}

export function cleanEnvString(envContent: string): string {
  return envContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"))
    .map(line => {
      const [key, ...rest] = line.split("=");
      let value = rest.join("=").trim();

      // Strip surrounding quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      return `${key.trim()}=${value}`;
    })
    .join("\n");
}


export function listToEnvString(list: any[]): string {
  const raw = list.map(item => `${item.title}=${item.value}`).join("\n");
  return cleanEnvString(raw);
}


export function downloadEnvFile(input: any[] | string, filename = ".env") {
  let envContent: string;

  if (typeof input === "string") {
    envContent = cleanEnvString(input);
  } else {
    envContent = listToEnvString(input);
  }

  const blob = new Blob([envContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}