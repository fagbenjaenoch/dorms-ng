import { APIResponse } from "../dto";
import { EntityType } from "../types";

interface uploadParams {
  entityName: string;
  entityType: EntityType;
  primaryPhoto: File;
}

export async function uploadPhoto({
  entityName,
  entityType,
  primaryPhoto,
}: uploadParams): Promise<string> {
  const formData = new FormData();
  formData.append("primaryPhoto", primaryPhoto);

  const presignedUrlReqBody = {
    entity_name: entityName,
    entity_type: entityType,
    file_name: primaryPhoto.name,
  };

  const presignedUrlReq = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/presigned-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(presignedUrlReqBody),
    },
  );
  if (!presignedUrlReq.ok) {
    throw new Error("Failed to get presigned URL");
  }

  const presignedUrlRes = (await presignedUrlReq.json()) as any as APIResponse<{
    upload_url: string;
    key: string;
  }>;

  const uploadReq = await fetch(presignedUrlRes.payload.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": primaryPhoto.type,
      "If-None-Match": "*",
    },
    body: primaryPhoto,
  });
  if (!uploadReq.ok && uploadReq.status !== 412) {
    throw new Error("Failed to upload primary photo");
  }

  return presignedUrlRes.payload.key;
}
