import { Button, Card, CardBody, CardHeader } from '@heroui/react'

export default function Test() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md font-semibold">NextUI Component Test</p>
          <p className="text-small text-default-500">HeroUI Integration</p>
        </div>
      </CardHeader>
      <CardBody>
        <Button color="primary" variant="shadow">
          NextUI Button Works! ✨
        </Button>
      </CardBody>
    </Card>
  )
}
