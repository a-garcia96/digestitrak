import createClient from "@/utils/supabase/api";

function stringOrFirstString(item) {
  return Array.isArray(item) ? item[0] : item;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end();
    return;
  }

  const queryParams = req.query;
  const token_hash = stringOrFirstString(queryParams.token_hash);
  const type = stringOrFirstString(queryParams.type);

  let next = "/error";

  if (token_hash && type) {
    const supabase = createClient(req, res);
    const { error } = await supabase.auth.verifyOtp({
      type: type,
      token_hash,
    });

    if (error) {
      console.error(error);
    } else {
      next = stringOrFirstString(queryParams.next) || "/";
    }
  }

  res.writeHead(302, { Location: next });
  res.end();
}
