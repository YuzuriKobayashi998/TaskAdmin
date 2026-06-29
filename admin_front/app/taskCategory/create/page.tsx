"use client";

import { useEffect, useState } from "react";
import { getMyPage } from "@/app/services/userApi";
import { UserResponse } from "@/app/types/user";

const [users, setUsers] = useState<UserResponse>();

